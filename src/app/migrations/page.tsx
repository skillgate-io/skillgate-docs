import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Migrations',
  description: 'Pre-launch migration documentation status.',
};

export default function MigrationsPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>More</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Migrations
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Migration playbooks are being prepared for launch.
        </p>
      </div>

      <h2>Current status</h2>
      <ul>
        <li>Versioned upgrade guides are not published yet.</li>
        <li>Compatibility tables will be added with launch release notes.</li>
      </ul>

      <p>
        Need migration planning support now? Contact <a href="mailto:support@skillgate.io" className="sg-link">support@skillgate.io</a>.
      </p>
    </div>
  );
}
