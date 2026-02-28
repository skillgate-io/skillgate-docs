import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'hunt - CLI Reference',
  description: 'Search historical SkillGate scan reports using the hunt DSL query language.',
};

export default function HuntPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>hunt</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Search historical scan reports for findings matching a DSL query. Query by rule ID, severity, date range, file path, or any combination.
        </p>
      </div>

      <CodeBlock
        language="text"
        code={`skillgate hunt <query> [options]

Arguments:
  query    Hunt DSL query string`}
      />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>Options</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Flag', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { flag: '--data-dir, -d', default: 'none', desc: 'Directory containing JSON scan report files to search.' },
              { flag: '--data-file, -f', default: 'none', desc: 'Single JSON file containing a list of scan reports.' },
              { flag: '--format', default: 'table', desc: 'Output format: table or json.' },
              { flag: '--quiet, -q', default: 'false', desc: 'Suppress non-data output.' },
            ].map((row, i) => (
              <tr key={row.flag} style={{ borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{row.flag}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{row.default}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Query language</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Token', 'Example', 'Matches'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { token: 'rule:', example: 'rule:SG-SHELL-001', matches: 'Findings with this rule ID.' },
              { token: 'severity:', example: 'severity:critical', matches: 'Findings with this severity level.' },
              { token: 'category:', example: 'category:shell', matches: 'Findings in this category.' },
              { token: 'file:', example: 'file:tool.py', matches: 'Findings in files matching this pattern.' },
              { token: 'after:', example: 'after:2025-01-01', matches: 'Scans run after this date (ISO 8601).' },
              { token: 'before:', example: 'before:2025-12-31', matches: 'Scans run before this date.' },
            ].map((row, i) => (
              <tr key={row.token} style={{ borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--accent)' }}>{row.token}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{row.example}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{row.matches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>
      <CodeBlock language="bash" code={`# Find all CRITICAL shell findings across a directory of reports
skillgate hunt 'severity:critical category:shell' --data-dir ./reports

# Find SG-SHELL-001 findings from this year
skillgate hunt 'rule:SG-SHELL-001 after:2025-01-01' --data-dir ./reports

# Find credential findings in specific files
skillgate hunt 'category:credential file:config.py' --data-file all-reports.json

# JSON output for scripting
skillgate hunt 'severity:high after:2025-06-01' --data-dir ./reports --format json`} />

      <Callout variant="tip">
        Combine multiple tokens with spaces - all tokens must match (AND semantics). For example, <code>rule:SG-NET-001 after:2025-01-01 severity:high</code> finds HIGH severity network findings from scans run in 2025.
      </Callout>
    </div>
  );
}
