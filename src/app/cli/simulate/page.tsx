import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'simulate - CLI Reference',
  description: 'Dry-run policy impact across skill bundles without enforcing or blocking.',
};

export default function SimulatePage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>simulate</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Dry-run policy impact across one or more skill bundles without enforcing, blocking, or creating reports.
          Use this to preview what a policy change would catch before rolling it out.
        </p>
      </div>

      <CodeBlock
        language="text"
        code={`skillgate simulate [paths...] [options]

Arguments:
  paths    One or more bundle paths to simulate (optional with --org)`}
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
              { flag: '--org', default: 'none', desc: 'Organization selector: github:acme/* for a GitHub org, or ./repos/acme/* for a local path glob.' },
              { flag: '--policy, -p', default: 'production', desc: 'Policy preset or file path to simulate against.' },
              { flag: '--output, -o', default: 'human', desc: 'Output format: human or json.' },
              { flag: '--fail-on-failures', default: 'false', desc: 'Exit 1 if any simulated bundle would fail under the given policy.' },
            ].map((row, i) => (
              <tr key={row.flag} style={{ borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{row.flag}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{row.default}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>

      <CodeBlock language="bash" code={`# Simulate two bundles against the production preset
skillgate simulate ./skill1 ./skill2 --policy production

# Simulate all skills in a GitHub org
skillgate simulate --org github:acme/* --policy strict

# Simulate a local org path glob
skillgate simulate --org ./repos/acme/* --policy staging

# JSON output for pipeline consumption
skillgate simulate ./skills --policy production --output json

# Exit 1 if any bundle would fail
skillgate simulate ./skills --policy strict --fail-on-failures`} />

      <Callout variant="info">
        <code>simulate</code> never writes reports, signs output, or submits to the API. It is a read-only preview command. No enforcement happens regardless of flags.
      </Callout>
    </div>
  );
}
