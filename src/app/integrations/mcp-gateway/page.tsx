import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PageWithTOC } from '@/components/ui/PageWithTOC';

export const metadata: Metadata = {
  title: 'MCP Gateway Integration | SkillGate',
  description:
    'Approve trusted MCP providers and block unsafe capability changes before they reach your model. Audit MCP tool access and detect settings drift in real time.',
  keywords: [
    'SkillGate MCP gateway',
    'MCP tool security',
    'Model Context Protocol enforcement',
    'MCP provider trust',
    'MCP settings drift detection',
    'AI tool poisoning prevention',
    'MCP permission control',
  ],
  openGraph: {
    title: 'MCP Gateway Integration | SkillGate',
    description:
      'Keep MCP tool access safe. Approve trusted providers, block unsafe metadata, and detect settings drift.',
    type: 'article',
  },
};

const TOC = [
  { id: 'quick-start', label: 'Quick start' },
  { id: 'settings-checks', label: 'Settings checks' },
  { id: 'repo-user-scope', label: 'Repo vs user scope' },
  { id: 'related', label: 'Related pages' },
];

export default function MCPGatewayIntegrationPage() {
  return (
    <PageWithTOC items={TOC}>
      <div style={{ maxWidth: '720px' }} className="sg-prose">
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Integrations
          </div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              margin: 0,
            }}
          >
            MCP Gateway
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Keep MCP tool access safe by approving trusted providers and blocking unsafe capability
            changes before they reach your model.
          </p>
        </div>

        <h2 id="quick-start">Quick start</h2>
        <p>
          Approve a provider with a checksum so SkillGate can verify it hasn&apos;t changed, then
          inspect and audit access records.
        </p>
        <CodeBlock
          language="bash"
          code={`# Approve trusted provider
skillgate mcp allow filesystem \\
  --endpoint http://127.0.0.1:8901 \\
  --checksum <sha256> \\
  --permissions fs.read,fs.write

# Inspect current state
skillgate mcp inspect filesystem

# Audit recent access
skillgate mcp audit --limit 50`}
        />

        <h2 id="settings-checks">Settings checks</h2>
        <p>
          Compare current Claude settings files against a known-good baseline to detect unexpected
          permission expansion. Pass <code>--ci</code> to exit with code 1 on any drift.
        </p>
        <CodeBlock
          language="bash"
          code={`skillgate mcp settings-check \\
  --project-settings .claude/settings.json \\
  --global-settings ~/.claude/settings.json \\
  --baseline .skillgate/settings-baseline.json \\
  --ci`}
        />

        <h2 id="repo-user-scope">Repo vs user scope</h2>
        <p>
          Check repo settings in isolation from user settings, or combine both to get a full
          picture of what&apos;s permitted.
        </p>
        <CodeBlock
          language="bash"
          code={`# Repo scope only
skillgate mcp settings-check \\
  --project-settings .claude/settings.json \\
  --global-settings /dev/null \\
  --baseline .skillgate/settings-baseline.json \\
  --ci

# User scope only
skillgate mcp settings-check \\
  --project-settings /dev/null \\
  --global-settings ~/.claude/settings.json \\
  --baseline ~/.skillgate/settings-baseline.json \\
  --ci`}
        />

        <h2 id="related">Related pages</h2>
        <ul>
          <li>
            <Link href="/cli/mcp" className="sg-link">
              mcp command reference
            </Link>
          </li>
          <li>
            <Link href="/runtime-control" className="sg-link">
              Runtime Control
            </Link>
          </li>
        </ul>
      </div>
    </PageWithTOC>
  );
}
