import { useCallback, useState, useMemo } from 'react';
import posthog from 'posthog-js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  ParsedInstruction,
  PartiallyDecodedInstruction,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import idl from '@/lib/anchor/idl.json';

// Browser polyfill for Buffer
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = require('buffer/').Buffer;
}

const DEVNET_USD_PER_SOL = 150;
const PLATFORM_TREASURY_WALLET = process.env.NEXT_PUBLIC_PLATFORM_TREASURY_WALLET?.trim();

interface PurchaseResult {
  txSignature: string;
  pdaAddress: string;
}

interface ParsedSystemTransfer {
  source: string;
  destination: string;
  lamports: number;
}

function isPartiallyDecodedInstruction(
  instruction: ParsedInstruction | PartiallyDecodedInstruction
): instruction is PartiallyDecodedInstruction {
  return 'accounts' in instruction && Array.isArray(instruction.accounts);
}

function extractSystemTransfer(
  instruction: ParsedInstruction | PartiallyDecodedInstruction
): ParsedSystemTransfer | null {
  if (!('parsed' in instruction)) {
    return null;
  }

  const parsed = instruction.parsed as
    | {
        type?: string;
        info?: {
          source?: string;
          destination?: string;
          lamports?: number;
        };
      }
    | undefined;

  if (parsed?.type !== 'transfer') {
    return null;
  }

  if (
    typeof parsed.info?.source !== 'string' ||
    typeof parsed.info.destination !== 'string' ||
    typeof parsed.info.lamports !== 'number'
  ) {
    return null;
  }

  return {
    source: parsed.info.source,
    destination: parsed.info.destination,
    lamports: parsed.info.lamports,
  };
}

export type PurchaseStatus = 'idle' | 'simulating' | 'signing' | 'confirming' | 'success' | 'error';

export function usePurchaseSkill() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus>('idle');
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const recordPurchase = useMutation(api.skills.recordPurchase);

  const program = useMemo(() => {
    const provider = new anchor.AnchorProvider(
      connection,
      {} as any,
      anchor.AnchorProvider.defaultOptions()
    );
    return new anchor.Program(idl as any, provider);
  }, [connection]);

  const purchaseSkill = useCallback(
    async (
      skillId: string,
      priceUsdc: number,
      creatorWalletStr?: string
    ): Promise<PurchaseResult> => {
      if (!publicKey) throw new Error('Wallet not connected');

      setIsPurchasing(true);
      setPurchaseStatus('simulating');
      setPurchaseError(null);

      try {
        if (priceUsdc === 0) {
          setPurchaseStatus('confirming');
          await recordPurchase({
            skillId,
            buyerWallet: publicKey.toBase58(),
            txSignature: 'free_skill',
            pdaAddress: 'free_skill_pda',
            priceLamports: 0,
          });
          setPurchaseStatus('success');
          posthog.capture('skill_purchased', {
            skill_id: skillId,
            price_usdc: 0,
            is_free: true,
          });
          return {
            txSignature: 'free_skill',
            pdaAddress: 'free_skill_pda',
          };
        }

        if (!creatorWalletStr) throw new Error('Creator wallet missing for paid skill');
        if (!PLATFORM_TREASURY_WALLET) {
          throw new Error('Platform treasury wallet is not configured');
        }

        const creatorPubkey = new PublicKey(creatorWalletStr);
        const treasuryPubkey = new PublicKey(PLATFORM_TREASURY_WALLET);

        if (publicKey.equals(treasuryPubkey)) {
          throw new Error('Buyer wallet cannot match treasury wallet');
        }
        if (creatorPubkey.equals(treasuryPubkey)) {
          throw new Error('Creator wallet cannot match treasury wallet');
        }

        // Convert USD price to SOL (Assuming 1 SOL = $150 USD for devnet)
        const solAmount = priceUsdc / DEVNET_USD_PER_SOL;
        const totalLamports = Math.max(1, Math.floor(solAmount * LAMPORTS_PER_SOL));
        const totalLamportsBn = new anchor.BN(totalLamports);
        const creatorLamports = Math.floor((totalLamports * 9) / 10);
        const treasuryLamports = totalLamports - creatorLamports;

        // Derive PDA
        const [receiptPda] = PublicKey.findProgramAddressSync(
          [Buffer.from('receipt'), publicKey.toBuffer(), Buffer.from(skillId)],
          program.programId
        );

        console.log('Checking user balance and on-chain PDA state...');
        
        // 1. Check buyer balance on current network
        const balance = await connection.getBalance(publicKey, 'confirmed');
        const requiredBalance = totalLamports + 5000000; // Total lamports + 0.005 SOL buffer for fees and rent
        if (balance < requiredBalance) {
          const balanceSol = balance / LAMPORTS_PER_SOL;
          const requiredSol = requiredBalance / LAMPORTS_PER_SOL;
          throw new Error(
            `Insufficient SOL balance on Devnet. You have ${balanceSol.toFixed(4)} SOL but need approximately ${requiredSol.toFixed(4)} SOL (including transaction fees & rent).`
          );
        }

        // 2. Check if receipt account already exists on chain
        const receiptAccount = await connection.getAccountInfo(receiptPda, 'confirmed');
        if (receiptAccount !== null) {
          console.log('Skill already purchased on-chain (PDA exists). Recording in database and skipping tx...');
          setPurchaseStatus('confirming');
          await recordPurchase({
            skillId,
            buyerWallet: publicKey.toBase58(),
            txSignature: 'pre_purchased_on_chain',
            pdaAddress: receiptPda.toBase58(),
            creatorWallet: creatorPubkey.toBase58(),
            treasuryWallet: treasuryPubkey.toBase58(),
            priceLamports: totalLamports,
          });
          setPurchaseStatus('success');
          posthog.capture('skill_purchased', {
            skill_id: skillId,
            price_usdc: priceUsdc,
            is_free: false,
            already_on_chain: true,
          });
          return {
            txSignature: 'pre_purchased_on_chain',
            pdaAddress: receiptPda.toBase58(),
          };
        }

        console.log('Building transaction with accounts:', {
          buyer: publicKey.toBase58(),
          creator: creatorPubkey.toBase58(),
          treasury: treasuryPubkey.toBase58(),
          receipt: receiptPda.toBase58(),
        });

        // Use .instruction() to get the raw instruction and add it to a fresh Transaction
        const ix = await (program as any).methods
          .purchaseSkill(skillId, totalLamportsBn)
          .accounts({
            buyer: publicKey,
            creator: creatorPubkey,
            treasury: treasuryPubkey,
            receipt: receiptPda,
            systemProgram: SystemProgram.programId,
          } as any)
          .instruction();

        const tx = new Transaction().add(ix);

        // Fetch blockhash with 'confirmed' commitment for better simulation success on devnet
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
        tx.recentBlockhash = blockhash;
        tx.feePayer = publicKey;

        // 3. Run manual simulation before calling the wallet to catch error details
        console.log('Simulating transaction manually...');
        try {
          const simulation = await connection.simulateTransaction(tx);
          if (simulation.value.err) {
            console.error('Manual simulation failed:', simulation.value.err, simulation.value.logs);
            const logs = simulation.value.logs ? simulation.value.logs.join('\n') : '';
            if (logs.includes('Instruction: PurchaseSkill')) {
              if (logs.includes('custom program error: 0x0') || logs.includes('already in use')) {
                throw new Error('This skill has already been purchased by this wallet.');
              }
            }
            if (logs.includes('insufficient funds') || logs.includes('Insufficient funds')) {
              throw new Error('Insufficient SOL in wallet to cover the purchase price and network transaction fees.');
            }
            throw new Error(`Transaction simulation failed: ${JSON.stringify(simulation.value.err)}. Please make sure your wallet is on Devnet and has enough SOL.`);
          }
          console.log('Manual simulation succeeded!', simulation.value.unitsConsumed, 'units consumed.');
        } catch (simErr: any) {
          console.error('Error during manual simulation:', simErr);
          throw simErr;
        }

        setPurchaseStatus('signing');
        console.log('Sending transaction...');
        const signature = await sendTransaction(tx, connection);
        console.log('Transaction sent, signature:', signature);
        
        setPurchaseStatus('confirming');
        // Manual polling for confirmation to avoid flaky WebSocket signatureSubscribe errors
        let confirmed = false;
        let attempts = 0;
        const maxAttempts = 30;
        
        while (!confirmed && attempts < maxAttempts) {
          attempts++;
          const status = await connection.getSignatureStatus(signature);
          if (status.value?.confirmationStatus === 'confirmed' || status.value?.confirmationStatus === 'finalized') {
            confirmed = true;
          } else {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }

        if (!confirmed) {
          throw new Error('Transaction confirmation timed out. Please check your wallet history.');
        }

        console.log('Transaction confirmed!');

        const parsedTx = await connection.getParsedTransaction(signature, {
          commitment: 'confirmed',
          maxSupportedTransactionVersion: 0,
        });

        if (!parsedTx || !parsedTx.meta) {
          throw new Error('Unable to load confirmed transaction details');
        }

        const purchaseInstruction = parsedTx.transaction.message.instructions.find(
          (instruction): instruction is PartiallyDecodedInstruction =>
            isPartiallyDecodedInstruction(instruction) &&
            instruction.programId.equals(program.programId)
        );

        if (!purchaseInstruction) {
          throw new Error('Purchase instruction not found in confirmed transaction');
        }

        if (purchaseInstruction.accounts.length < 4) {
          throw new Error('Purchase instruction has invalid account layout');
        }

        const [ixBuyer, ixCreator, ixTreasury, ixReceipt] = purchaseInstruction.accounts
          .slice(0, 4)
          .map((account) => account.toBase58());

        if (ixBuyer !== publicKey.toBase58()) {
          throw new Error('Purchase proof mismatch: buyer account differs from connected wallet');
        }

        if (ixCreator !== creatorPubkey.toBase58()) {
          throw new Error('Purchase proof mismatch: creator account differs from expected creator');
        }

        if (ixTreasury !== treasuryPubkey.toBase58()) {
          throw new Error('Purchase proof mismatch: treasury account differs from configured treasury');
        }

        if (ixReceipt !== receiptPda.toBase58()) {
          throw new Error('Purchase proof mismatch: receipt PDA differs from expected derivation');
        }

        const transfers = (parsedTx.meta.innerInstructions ?? [])
          .flatMap((innerInstruction) => innerInstruction.instructions)
          .map((instruction) => extractSystemTransfer(instruction))
          .filter((transfer): transfer is ParsedSystemTransfer => transfer !== null);

        const hasCreatorTransfer = transfers.some(
          (transfer) =>
              transfer.source === publicKey.toBase58() &&
              transfer.destination === creatorPubkey.toBase58() &&
              transfer.lamports === creatorLamports
        );

        const hasTreasuryTransfer = transfers.some(
          (transfer) =>
              transfer.source === publicKey.toBase58() &&
              transfer.destination === treasuryPubkey.toBase58() &&
              transfer.lamports === treasuryLamports
        );

        if (!hasCreatorTransfer || !hasTreasuryTransfer) {
          throw new Error('Purchase proof mismatch: expected creator and treasury transfers were not both found');
        }

        const receiptAccountInfo = await connection.getAccountInfo(receiptPda, 'confirmed');
        if (!receiptAccountInfo || !receiptAccountInfo.owner.equals(program.programId)) {
          throw new Error('Purchase proof mismatch: receipt PDA was not created by the marketplace program');
        }

        // Record the confirmed purchase in Convex
        await recordPurchase({
          skillId,
          buyerWallet: publicKey.toBase58(),
          txSignature: signature,
          pdaAddress: receiptPda.toBase58(),
          creatorWallet: creatorPubkey.toBase58(),
          treasuryWallet: treasuryPubkey.toBase58(),
          priceLamports: totalLamports,
        });

        setPurchaseStatus('success');
        posthog.capture('skill_purchased', {
          skill_id: skillId,
          price_usdc: priceUsdc,
          price_lamports: totalLamports,
          is_free: false,
          tx_signature: signature,
          creator_wallet: creatorWalletStr,
        });

        return {
          txSignature: signature,
          pdaAddress: receiptPda.toBase58(),
        };
      } catch (err: any) {
        console.error('Failed to purchase skill:', err);
        if (err.logs) {
          console.error('Simulation logs:', err.logs);
        }
        setPurchaseStatus('error');
        setPurchaseError(err.message || String(err));
        posthog.capture('skill_purchase_failed', {
          skill_id: skillId,
          price_usdc: priceUsdc,
          error_message: err.message || String(err),
        });
        posthog.captureException(err, { skill_id: skillId });
        throw err;
      } finally {
        setIsPurchasing(false);
      }
    },
    [publicKey, sendTransaction, connection, recordPurchase, program]
  );

  return { purchaseSkill, isPurchasing, purchaseStatus, purchaseError };
}
