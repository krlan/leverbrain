import { useCallback, useState, useMemo } from 'react';
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

export function usePurchaseSkill() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isPurchasing, setIsPurchasing] = useState(false);
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
      try {
        if (priceUsdc === 0) {
          await recordPurchase({
            skillId,
            buyerWallet: publicKey.toBase58(),
            txSignature: 'free_skill',
            pdaAddress: 'free_skill_pda',
            priceLamports: 0,
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

        console.log('Sending transaction...');
        const signature = await sendTransaction(tx, connection);
        console.log('Transaction sent, signature:', signature);
        
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


        return {
          txSignature: signature,
          pdaAddress: receiptPda.toBase58(),
        };
      } catch (err: any) {
        console.error('Failed to purchase skill:', err);
        // If it's a simulation error, it might contain more details in err.logs
        if (err.logs) {
          console.error('Simulation logs:', err.logs);
        }
        throw err;
      } finally {
        setIsPurchasing(false);
      }
    },
    [publicKey, sendTransaction, connection, recordPurchase, program]
  );

  return { purchaseSkill, isPurchasing };
}
