import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'mcp - CLI Reference',
  description: 'Approve, inspect, audit, attest, and verify MCP providers with explicit policy controls.',
};

export default function MCPPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>mcp</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Use these commands when you need MCP provider governance in production: allow trusted providers,
          block risky ones, verify plugin attestations, and detect settings drift before execution.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate mcp <subcommand> [options]`} />

      <h2>Common workflow</h2>
      <CodeBlock
        language="bash"
        code={`# Approve a server with checksum and capabilities
skillgate mcp allow filesystem \
  --endpoint http://127.0.0.1:8901 \
  --checksum <sha256> \
  --permissions fs.read,fs.write

# Inspect and audit
skillgate mcp inspect filesystem
skillgate mcp audit --limit 50

# Block a provider
skillgate mcp deny filesystem`}
      />

      <h2>Settings governance</h2>
      <CodeBlock
        language="bash"
        code={`# Detect allowedTools or permission expansion
skillgate mcp settings-check \
  --project-settings .claude/settings.json \
  --global-settings ~/.claude/settings.json \
  --baseline .skillgate/settings-baseline.json \
  --ci`}
      />

      <h2>Repo scope vs user scope</h2>
      <CodeBlock
        language="bash"
        code={`# Repo scope: enforce project settings only
skillgate mcp settings-check \
  --project-settings .claude/settings.json \
  --global-settings /dev/null \
  --baseline .skillgate/settings-baseline.json \
  --ci

# User scope: enforce user settings only
skillgate mcp settings-check \
  --project-settings /dev/null \
  --global-settings ~/.claude/settings.json \
  --baseline ~/.skillgate/settings-baseline.json \
  --ci`}
      />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>All subcommands</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Subcommand', 'What you use it for'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['list', 'Show approved providers and trust metadata.'],
              ['allow', 'Approve a provider with endpoint, checksum, and permissions.'],
              ['deny', 'Block a provider explicitly.'],
              ['inspect', 'Inspect one provider in detail.'],
              ['audit', 'Review MCP decisions and policy outcomes.'],
              ['attest', 'Create a signed plugin attestation for governance policy.'],
              ['verify', 'Verify a plugin attestation file before trusting it.'],
              ['settings-check', 'Detect permission expansion in settings files.'],
            ].map(([cmd, desc]) => (
              <tr key={cmd} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--accent)' }}>{cmd}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Attestation workflow</h2>
      <CodeBlock
        language="bash"
        code={`# Create a signed attestation for a plugin artifact
skillgate mcp attest \
  --plugin my-provider \
  --version 1.2.0 \
  --checksum <sha256> \
  --publisher skillgate \
  --output .skillgate/mcp/my-provider.attestation.json

# Verify attestation before trust
skillgate mcp verify .skillgate/mcp/my-provider.attestation.json`}
      />
    </div>
  );
}
