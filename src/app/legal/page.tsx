import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal',
  description: 'Legal review checklist and templates for vendor security and procurement.',
};

export default function LegalPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Legal</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Legal
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Use this checklist for procurement and legal review workflows.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '12px', marginBottom: '28px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {[
          { title: 'DPA', desc: 'Available on request for legal review.' },
          { title: 'Security terms', desc: 'Available on request for procurement.' },
          { title: 'Subprocessors', desc: 'Current disclosure summary available.' },
        ].map((item) => (
          <div key={item.title} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '14px', background: 'var(--sidebar-bg)' }}>
            <p style={{ margin: 0, color: 'var(--text)', fontWeight: 700, fontSize: '0.95rem' }}>{item.title}</p>
            <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Review checklist</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '14px 16px', marginBottom: '24px' }}>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)' }}>
          <li>Retention and deletion windows are documented.</li>
          <li>Incident notification timelines are agreed.</li>
          <li>Subprocessor update notice process is defined.</li>
        </ul>
      </div>

      <p>
        Need legal documents for review? Contact <a href="mailto:support@skillgate.io" className="sg-link">support@skillgate.io</a>.
      </p>
    </div>
  );
}
