import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PageWithTOC } from '@/components/ui/PageWithTOC';

export const metadata: Metadata = {
  title: 'Codex CLI Integration | SkillGate',
  description:
    'Run Codex CLI through SkillGate to apply policy checks before every command executes. Approve trusted providers, control filesystem and network permissions, and run CI-hardened Codex pipelines.',
  keywords: [
    'SkillGate Codex CLI',
    'Codex CLI security',
    'OpenAI Codex policy enforcement',
    'Codex safe execution',
    'agent tool trust workflow',
    'Codex CI security',
    'approve filesystem permissions Codex',
  ],
  openGraph: {
    title: 'Codex CLI Integration | SkillGate',
    description:
      'Apply policy checks to Codex CLI commands before they run. Control what Codex can access with provider trust workflows.',
    type: 'article',
  },
};

const TOC = [
  { id: 'quick-start', label: 'Quick start' },
  { id: 'repo-user-scope', label: 'Repo vs user scope' },
  { id: 'provider-trust', label: 'Provider trust workflow' },
  { id: 'related', label: 'Related pages' },
];

export default function CodexCLIIntegrationPage() {
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
            Codex CLI
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Run Codex through SkillGate to apply policy checks before commands execute.
          </p>
        </div>

        <h2 id="quick-start">Quick start</h2>
        <CodeBlock
          language="bash"
          code={`# Local guarded run
skillgate codex --directory . exec "review this repository"

# CI hardened run
skillgate codex --ci --output sarif --directory . exec "run release checks"`}
        />

        <h2 id="repo-user-scope">Repo vs user scope</h2>
        <p>
          Use repo scope to apply project-level controls, and user scope to govern what Codex can
          access across your home directory.
        </p>
        <CodeBlock
          language="bash"
          code={`# Repo scope
skillgate codex --directory . exec "review this repository"

# User scope
skillgate codex --directory "$HOME" exec "list active projects"`}
        />

        <h2 id="provider-trust">Provider trust workflow</h2>
        <p>
          Approve specific filesystem or network providers before Codex can use them. Revoke access
          at any time.
        </p>
        <CodeBlock
          language="bash"
          code={`# Approve
skillgate codex approve filesystem --permissions fs.read,fs.write --directory .

# Revoke
skillgate codex revoke filesystem --directory .`}
        />

        <h2 id="related">Related pages</h2>
        <ul>
          <li>
            <Link href="/cli/codex" className="sg-link">
              codex command reference
            </Link>
          </li>
          <li>
            <Link href="/agent-gateway" className="sg-link">
              Agent Gateway
            </Link>
          </li>
        </ul>
      </div>
    </PageWithTOC>
  );
}
