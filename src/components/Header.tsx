"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react'
import { useSolanaWallet } from '@/contexts/SolanaWalletContext'
import WalletConnectButton from './WalletConnectButton'

interface HeaderProps {
  onOpenPalette?: () => void
}

export default function Header({ onOpenPalette }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { connected } = useSolanaWallet()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const currentPath = pathname || ''

  return (
    <header className={`header ${isScrolled ? 'is-scrolled' : ''} ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
      <div className="container">
        <nav className="nav">
          <Link href="/" className="logo">
            <span className="logo-mark" aria-hidden="true" />
            <span className="logo-text">Leverbrain</span>
          </Link>

          <div className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="nav-links">
              <Link
                href="/skills"
                className={`nav-link ${currentPath.startsWith('/skills') ? 'active' : ''}`}
              >
                Skills
              </Link>
              <Link
                href="/docs"
                className={`nav-link ${currentPath.startsWith('/docs') ? 'active' : ''}`}
              >
                Docs
              </Link>
                <button
                  type="button"
                  className="nav-link nav-search-trigger"
                  onClick={onOpenPalette}
                  aria-label="Open command palette"
                >
                  <Search size={13} className="nav-search-glyph" />
                  <span className="nav-search-label show-on-mobile">Search</span>
                  <span className="nav-search-spacer hide-on-mobile" aria-hidden="true" />
                  <kbd className="nav-kbd hide-on-mobile">Esc</kbd>
                </button>
              </div>
            <div className="nav-cta">
              <div className="nav-user-cluster">
                {connected && (
                  <>
                    <Link
                      href="/profile"
                      className={`nav-link ${currentPath === '/profile' ? 'active' : ''}`}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/lab"
                      className={`nav-link ${currentPath === '/lab' || currentPath === '/config' ? 'active' : ''}`}
                    >
                      Lab
                    </Link>
                    <span className="nav-user-divider" />
                  </>
                )}
                <WalletConnectButton />
              </div>
            </div>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>
    </header>
  )
}
