import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Integration',
  description: 'Pre-launch API integration overview.',
};

export default function ApiPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          API Integration
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Public API reference is being finalized for launch.
        </p>
      </div>

      <h2>Available now</h2>
      <ul>
        <li>High-level integration guidance for evaluation and planning.</li>
        <li>Support-based onboarding for early integration work.</li>
      </ul>

      <h2>Planned for launch</h2>
      <ul>
        <li>Endpoint-level API reference.</li>
        <li>Webhook event guide and retry behavior details.</li>
        <li>Authentication and environment setup examples.</li>
      </ul>

      <p>
        For integration support, contact <a href="mailto:support@skillgate.io" className="sg-link">support@skillgate.io</a>.
      </p>
    </div>
  );
}
