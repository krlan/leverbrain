import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="footer-logo-mark" aria-hidden="true" />
              <span>LEVERBRAIN</span>
            </Link>
            <p className="footer-tagline">
              The expertise marketplace for AI and operators — skills, strategies, and blueprints owned on-chain.
            </p>
          </div>

          <div className="footer-nav">
            <div className="footer-nav-group">
              <h4 className="footer-nav-title">Marketplace</h4>
              <ul>
                <li><Link href="/skills">Skills</Link></li>
                <li><Link href="/skills?category=strategy">Strategies</Link></li>
                <li><Link href="/skills?category=blueprint">Blueprints</Link></li>
                <li><Link href="/publish">Publish</Link></li>
              </ul>
            </div>

            <div className="footer-nav-group">
              <h4 className="footer-nav-title">Developers</h4>
              <ul>
                <li><Link href="/docs">Docs</Link></li>
                <li>
                  <a href="/agents.md" target="_blank" rel="noreferrer">
                    agents.md
                  </a>
                </li>
                <li>
                  <a href="https://www.npmjs.com/package/leverbrain" target="_blank" rel="noreferrer">
                    npm package
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-nav-group">
              <h4 className="footer-nav-title">Legal</h4>
              <ul>
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">&copy; {currentYear} Leverbrain. All rights reserved.</p>
          <a href="mailto:hi@leverbrain.com" className="footer-email">
            hi@leverbrain.com
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  )
}
