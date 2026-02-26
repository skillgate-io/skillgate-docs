import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'MCP Gateway Integration',
  description: 'Use SkillGate with MCP providers and OpenClaw tool paths to enforce trust checks and permission controls before tool use.',
};

export default function MCPGatewayIntegrationPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Integrations</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          MCP Gateway
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Keep MCP tool access safe by approving trusted providers and blocking unsafe capability changes.
        </p>
      </div>

      <h2>Quick start</h2>
      <CodeBlock
        language="bash"
        code={`# Approve trusted provider
skillgate mcp allow filesystem --endpoint http://127.0.0.1:8901 --checksum <sha256> --permissions fs.read,fs.write

# Inspect and audit
skillgate mcp inspect filesystem
skillgate mcp audit --limit 50`}
      />

      <h2>Settings checks</h2>
      <CodeBlock
        language="bash"
        code={`skillgate mcp settings-check \\
  --project-settings .claude/settings.json \\
  --global-settings ~/.claude/settings.json \\
  --baseline .skillgate/settings-baseline.json \\
  --ci`}
      />

      <h2>Repo scope vs user scope</h2>
      <CodeBlock
        language="bash"
        code={`# Repo scope baseline
skillgate mcp settings-check \\
  --project-settings .claude/settings.json \\
  --global-settings /dev/null \\
  --baseline .skillgate/settings-baseline.json \\
  --ci

# User scope baseline
skillgate mcp settings-check \\
  --project-settings /dev/null \\
  --global-settings ~/.claude/settings.json \\
  --baseline ~/.skillgate/settings-baseline.json \\
  --ci`}
      />

      <h2>Related pages</h2>
      <ul>
        <li><Link href="/cli/mcp" className="sg-link">mcp command reference</Link></li>
        <li><Link href="/runtime-control" className="sg-link">Runtime Control</Link></li>
      </ul>
    </div>
  );
}
