import Link from 'next/link';

// Global fallback 404 for non-localized / unmatched paths. The root layout is a
// passthrough, so this page renders its own <html>/<body>.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#0A1B2E',
          color: '#fff',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '3rem', margin: 0 }}>404</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>
          This page doesn’t exist.
        </p>
        <Link
          href="/en"
          style={{
            marginTop: '1.5rem',
            display: 'inline-block',
            borderRadius: '9999px',
            background: '#1F6FEB',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            textDecoration: 'none',
          }}
        >
          Back to home
        </Link>
      </body>
    </html>
  );
}
