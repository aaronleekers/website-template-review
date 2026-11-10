import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell message-page">
      <p className="eyebrow">404</p>
      <h1>Page not found.</h1>
      <p>This page does not exist or has not been published.</p>
      <Link className="text-link" href="/">Return home <span aria-hidden="true">→</span></Link>
    </section>
  );
}
