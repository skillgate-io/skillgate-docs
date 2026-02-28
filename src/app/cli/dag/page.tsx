import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'dag - CLI Reference',
  description: 'Session lineage DAG: show, verify, and compute transitive risk metrics from signed runtime artifacts.',
};

export default function DagPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>dag</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Inspect signed runtime session artifacts. Show the lineage graph, verify the artifact signature,
          and compute transitive risk scores across the full session DAG.
          Requires API key with TRUST_GRAPH capability for risk analysis.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate dag show <session-artifact>
skillgate dag verify <session-artifact>
skillgate dag risk <session-artifact> [OPTIONS]`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>Subcommands</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Subcommand', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['show', 'Display the session lineage DAG in a readable format.'],
              ['verify', 'Verify the Ed25519 signature of a signed session artifact.'],
              ['risk', 'Compute transitive risk metrics across the full session DAG.'],
            ].map(([cmd, desc]) => (
              <tr key={cmd} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)' }}>{cmd}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>dag risk options</h2>
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
              ['--output, -o', 'human', 'Output format: human or json.'],
              ['--max-depth', '', 'Fail if DAG depth exceeds this value.'],
              ['--max-risk-score', '', 'Fail if lineage risk score exceeds this value.'],
              ['--allow-unsigned', 'false', 'Allow risk analysis without signature verification (debug only).'],
            ].map(([flag, def, desc]) => (
              <tr key={flag} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{flag}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{def || '—'}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>
      <CodeBlock language="bash" code={`# Show the session lineage graph
skillgate dag show .skillgate/runtime/session.json

# Verify the artifact signature
skillgate dag verify .skillgate/runtime/session.json

# Compute risk metrics and output as JSON
skillgate dag risk .skillgate/runtime/session.json --output json

# Fail if risk score exceeds 80 or DAG depth exceeds 5
skillgate dag risk .skillgate/runtime/session.json \\
  --max-risk-score 80 \\
  --max-depth 5`} />
    </div>
  );
}
