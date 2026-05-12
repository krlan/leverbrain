import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <section className="not-found-hero">
        <div className="grid-bg" />
        <div className="container">
          <div className="not-found-content">
            <span className="not-found-code">404</span>
            <h1>Page not found</h1>
            <p>
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>
            <Link href="/" className="btn btn-primary">
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
