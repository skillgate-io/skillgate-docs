import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Intelligence',
  description: 'Use reputation context and historical queries to prioritize findings and respond faster.',
};

export default function IntelligencePage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Runtime</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Intelligence
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Connect individual findings into a broader risk picture. Use reputation signals, historical
          queries, and retroscans to prioritize what matters and respond to new threats faster.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Intelligence flow</h2>
      <CodeBlock language="text" code={`[Bundle Hash + Findings] -> [Reputation Check] -> [Confidence Banding]
         |                    |                    |
         v                    v                    v
  [Signed Submission]   [Cross-Org Signals]   [Risk Enrichment]
         |                    |                    |
         +--------------------+--------------------+
                              |
                              v
                   [Policy Decision + Explain]
                              |
                              v
                   [Hunt + Retro + Reporting]`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Reputation graph</h2>
      <CodeBlock language="bash" code={`# Verify the signed reputation graph
skillgate reputation verify .skillgate/reputation/reputation.json

# Evaluate one bundle hash in prod
skillgate reputation check \\
  --bundle-hash <sha256> \\
  --env prod \\
  --store .skillgate/reputation/reputation.json

# Submit an anonymized suspicious verdict
skillgate reputation submit \\
  --bundle-hash <sha256> \\
  --verdict suspicious \\
  --anonymized`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Executive explain profile</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Generate a CISO-style risk summary for a scan result. The explain mode produces a plain-language
        report without technical rule IDs so stakeholders can review findings without reading raw output.
      </p>
      <CodeBlock language="bash" code={`skillgate scan ./my-agent-skill --explain --explain-mode executive --output json`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Hunt and retroscan</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Search historical scan reports and replay them with updated rules to see how the risk picture
        changes over time.
      </p>
      <CodeBlock language="bash" code={`# Query historical scan data with the hunt DSL
skillgate hunt --query "severity >= high AND rule =~ SG-CRED-*"

# Replay historical reports with the latest rules
skillgate retroscan --input ./reports --output ./retroscan-results`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>Related commands</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 2.2, paddingLeft: '20px' }}>
        {[
          'skillgate reputation verify / check / submit',
          'skillgate hunt — DSL query over historical reports',
          'skillgate retroscan — replay old reports with updated rules',
          'skillgate scan --explain --explain-mode executive',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}><code style={{ fontFamily: 'monospace', fontSize: '0.85em' }}>{item}</code></li>
        ))}
      </ul>
    </div>
  );
}
