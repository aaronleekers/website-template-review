import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Website Template Review', template: '%s | Website Template Review' },
  description: 'A small Next.js and Sanity website template for technical review.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="wordmark" href="/">Website Template<span>Review edition</span></Link>
            <nav aria-label="Main navigation">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>{children}</main>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <p>A small foundation for content-driven websites.</p>
            <span>Next.js + Sanity</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
