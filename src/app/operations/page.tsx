import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Operations',
  description: 'Pre-launch operations documentation status.',
};

export default function OperationsPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Operations</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Operations
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Detailed runbooks are being finalized and are not part of the current public docs set.
        </p>
      </div>

      <h2>Current status</h2>
      <ul>
        <li>Public docs focus on end-user setup and policy workflows.</li>
        <li>Operational procedures are shared directly with deployment owners.</li>
      </ul>

      <p>
        If you need operations guidance now, contact <a href="mailto:support@skillgate.io" className="sg-link">support@skillgate.io</a>.
      </p>
    </div>
  );
}
