"use client";

import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import { getSolanaRuntimeConfig } from '@/config/solana';

export const SolanaWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const config = getSolanaRuntimeConfig();

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={config.rpcEndpoint}>
            <WalletProvider
                wallets={wallets}
                autoConnect
                onError={(error) => console.error('[WalletProvider] error:', error)}
            >
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
