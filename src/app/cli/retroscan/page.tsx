import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'retroscan - CLI Reference',
  description: 'Replay historical SkillGate scan reports with updated rules and show impact diffs.',
};

export default function RetroscanPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>retroscan</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Replay historical scan reports against updated rules and show the impact diff. Use this after adding or changing detection rules to understand retroactive coverage changes.
        </p>
      </div>

      <CodeBlock
        language="text"
        code={`skillgate retroscan [options]`}
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
              { flag: '--data-dir, -d', default: 'none', desc: 'Directory containing JSON scan report files to replay.' },
              { flag: '--data-file, -f', default: 'none', desc: 'Single JSON file containing a list of scan reports.' },
              { flag: '--trigger, -t', default: 'manual', desc: 'Trigger type: manual, rule_update, rule_add, or rule_remove.' },
              { flag: '--rule-ids, -r', default: '""', desc: 'Comma-separated rule IDs for context (which rules changed).' },
              { flag: '--format', default: 'table', desc: 'Output format: table or json.' },
              { flag: '--quiet, -q', default: 'false', desc: 'Suppress non-data output.' },
            ].map((row, i) => (
              <tr key={row.flag} style={{ borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{row.flag}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{row.default}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>
      <CodeBlock language="bash" code={`# Replay all reports in a directory (manual trigger)
skillgate retroscan --data-dir ./reports

# Replay after adding a new rule
skillgate retroscan --data-dir ./reports --trigger rule_add --rule-ids SG-SHELL-099

# Replay after updating existing rules
skillgate retroscan --data-dir ./reports --trigger rule_update --rule-ids SG-NET-001,SG-NET-002

# JSON output for analysis
skillgate retroscan --data-dir ./reports --format json`} />

      <Callout variant="info">
        Retroscan replays the original source code snapshots from the stored reports - it does not re-read the live filesystem. This makes it deterministic and safe to run against archived scan data.
      </Callout>
    </div>
  );
}
