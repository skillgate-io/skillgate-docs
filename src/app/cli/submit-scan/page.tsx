import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'submit-scan - CLI Reference',
  description: 'Submit a SkillGate JSON scan report to the hosted API for storage and search.',
};

export default function SubmitScanPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>submit-scan</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Submit a JSON scan report file to the SkillGate hosted API for storage, search, and historical analysis.
          This is the manual equivalent of <code>skillgate scan --submit</code>.
        </p>
      </div>

      <CodeBlock
        language="text"
        code={`skillgate submit-scan <report-file> [options]

Arguments:
  report-file    Path to JSON report file produced by skillgate scan`}
      />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>Options</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Flag', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)' }}>--quiet, -q</td>
              <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>Suppress non-error output.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>
      <CodeBlock language="bash" code={`# Submit a previously saved scan report
skillgate submit-scan report.json

# Submit quietly (exit code only)
skillgate submit-scan report.json --quiet

# Typical pipeline: scan, save, then submit
skillgate scan ./skills/my-skill --report-file report.json
skillgate submit-scan report.json`} />

      <Callout variant="tip">
        If you want to scan and submit in one step, use <code>skillgate scan --submit</code> instead.
      </Callout>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>Command order by scenario</h2>
      <CodeBlock language="bash" code={`# Scenario 1: manual upload from a local report
skillgate scan ./my-skill --output json --report-file /tmp/scan-report.json
skillgate submit-scan /tmp/scan-report.json

# Scenario 2: signed evidence with verification before submit
skillgate scan ./my-skill --sign --report-file /tmp/scan-signed.json
skillgate verify /tmp/scan-signed.json
skillgate submit-scan /tmp/scan-signed.json

# Scenario 3: quiet mode for scripted pipelines
skillgate submit-scan /tmp/scan-report.json --quiet`} />
    </div>
  );
}
