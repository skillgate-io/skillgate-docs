import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'mcp - CLI Reference',
  description: 'MCP commands for trusted providers, audit visibility, and permission change controls.',
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
          Use MCP commands to approve trusted providers, review activity, and catch permission changes before tool calls run.
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

      <h2>Subcommands</h2>
      <ul>
        <li><code>list</code>: show approved MCP servers and trust metadata.</li>
        <li><code>allow</code>: approve provider and capability scope.</li>
        <li><code>deny</code>: block provider explicitly.</li>
        <li><code>inspect</code>: view one provider record and checksum.</li>
        <li><code>audit</code>: display recent gateway decisions.</li>
        <li><code>settings-check</code>: detect settings permission expansion.</li>
      </ul>
    </div>
  );
}
