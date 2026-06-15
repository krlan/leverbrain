"use client";

import { createContext, useContext, useEffect, useMemo } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { getSolanaRuntimeConfig, type RpcProvider, type SolanaNetwork } from '@/config/solana';
import posthog from 'posthog-js';

interface SolanaWalletContextValue {
  connected: boolean;
  connecting: boolean;
  walletAddress: string | null;
  walletLabel: string;
  walletAvailable: boolean;
  network: SolanaNetwork;
  rpcEndpoint: string;
  rpcProvider: RpcProvider;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

const SolanaWalletContext = createContext<SolanaWalletContextValue | null>(null);

export function useSolanaWallet() {
  const context = useContext(SolanaWalletContext);
  if (context) return context;

  // Fallback if not wrapped in provider (should not happen, but we can compute on the fly)
  throw new Error("useSolanaWallet must be used inside SolanaWalletProvider");
}

export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  const { connected, connecting, publicKey, wallet, connect, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const runtimeConfig = useMemo(() => getSolanaRuntimeConfig(), []);

  const connectWallet = async () => {
    if (wallet) {
      try {
        await connect();
      } catch (err) {
        console.error("Manual connect failed:", err);
        setVisible(true);
      }
    } else {
      setVisible(true);
    }
  };

  const disconnectWallet = async () => {
    posthog.capture('wallet_disconnected', {
      wallet_name: wallet?.adapter.name,
    });
    posthog.reset();
    await disconnect();
  };

  useEffect(() => {
    if (connected && publicKey) {
      const address = publicKey.toBase58();
      posthog.identify(address, { wallet_name: wallet?.adapter.name });
      posthog.capture('wallet_connected', { wallet_name: wallet?.adapter.name });
    }
  }, [connected, publicKey, wallet?.adapter.name]);

  const value = useMemo<SolanaWalletContextValue>(() => ({
    connected,
    connecting,
    walletAddress: publicKey?.toBase58() ?? null,
    walletLabel: wallet?.adapter.name ?? 'Wallet',
    walletAvailable: true,
    network: runtimeConfig.network,
    rpcEndpoint: runtimeConfig.rpcEndpoint,
    rpcProvider: runtimeConfig.rpcProvider,
    connectWallet,
    disconnectWallet,
  }), [connected, connecting, publicKey, wallet, runtimeConfig]);

  return (
    <SolanaWalletContext.Provider value={value}>
      {children}
    </SolanaWalletContext.Provider>
  );
}
