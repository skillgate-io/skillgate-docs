import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security',
  description: 'High-level security posture and disclosure contact.',
};

export default function SecurityPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>More</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Security
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          This page shares a high-level security overview for evaluation and procurement.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Current overview</h2>
      <div style={{ display: 'grid', gap: '12px', marginBottom: '28px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {[
          ['Static analysis', 'Local scanning does not execute analyzed skill code.'],
          ['Encrypted transport', 'Hosted communication uses encrypted transport.'],
          ['Review materials', 'Security documentation package is available on request.'],
        ].map(([title, desc]) => (
          <div key={title} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '14px', background: 'var(--sidebar-bg)' }}>
            <p style={{ margin: 0, color: 'var(--text)', fontWeight: 700, fontSize: '0.95rem' }}>{title}</p>
            <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Responsible disclosure</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '14px 16px' }}>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '10px' }}>
          Report security issues to{' '}
          <a href="mailto:support@skillgate.io" style={{ color: 'var(--accent)' }}>support@skillgate.io</a>{' '}
          with reproduction steps and impact assessment.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
          We confirm receipt and follow up with next steps.
        </p>
      </div>
    </div>
  );
}
