import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'report - CLI Reference',
  description: 'Generate governance reports for one workspace with a configurable reporting period.',
};

export default function ReportPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>report</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Generate governance-ready summaries you can share with security leadership or compliance reviewers.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate report governance --workspace <id> [--period <days>] [--log-dir <path>] [--out <file>]`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>Subcommands</h2>
      <CodeBlock language="text" code={`governance   Generate Agent Capability Governance Report (Markdown)`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>Examples</h2>
      <CodeBlock
        language="bash"
        code={`# Print a 30-day governance report in terminal
skillgate report governance --workspace acme-prod

# Generate a 90-day report
skillgate report governance --workspace acme-prod --period 90

# Save report to file
skillgate report governance \
  --workspace acme-prod \
  --period 30 \
  --out ./reports/acme-governance.md`}
      />
    </div>
  );
}
