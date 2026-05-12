"use client";

import { useState, useEffect } from 'react';
import ConvexClientProvider from '@/components/providers/ConvexProvider';
import { SolanaWalletProvider } from '@/components/providers/WalletProvider';
import { SolanaWalletProvider as SolanaWalletContextProvider } from '@/contexts/SolanaWalletContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import '@/styles/index.css';

function AppShell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingTarget =
        target !== null &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (e.key === 'Escape' && !paletteOpen && !isTypingTarget) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [paletteOpen]);

  return (
    <div className="app-container">
      <Header onOpenPalette={() => setPaletteOpen(true)} />
      <main className="main-content">{children}</main>
      <Footer />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Calistoga&family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Saira:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/vec.svg" type="image/svg+xml" />
        <title>Leverbrain — The expertise stack</title>
        <meta name="description" content="Skills, strategies, and blueprints for AI operators — purchased on-chain, deployed instantly." />
      </head>
      <body>
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
        </svg>
        <ConvexClientProvider>
          <SolanaWalletProvider>
            <SolanaWalletContextProvider>
              <AppShell>{children}</AppShell>
            </SolanaWalletContextProvider>
          </SolanaWalletProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
