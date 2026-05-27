"use client";

import { useMemo } from 'react'
import { useSolanaWallet } from '@/contexts/SolanaWalletContext'

function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export default function WalletConnectButton() {
  const {
    connected,
    connecting,
    walletAddress,
    walletAvailable,
    connectWallet,
    disconnectWallet,
  } = useSolanaWallet()

  const label = useMemo(() => {
    if (connecting) {
      return 'Connecting...'
    }
    if (!walletAvailable) {
      return 'Install Wallet'
    }
    if (!connected || !walletAddress) {
      return 'Connect'
    }
    return shortenAddress(walletAddress)
  }, [connected, connecting, walletAddress, walletAvailable])

  const handleClick = async () => {
    if (connected) {
      await disconnectWallet()
      return
    }

    await connectWallet()
  }

  return (
    <button
      type="button"
      className="btn btn-primary nav-wallet-btn"
      onClick={handleClick}
      disabled={connecting}
      aria-label={connected ? 'Disconnect wallet' : 'Connect wallet'}
    >
      {label}
    </button>
  )
}
