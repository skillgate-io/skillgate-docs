import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PageWithTOC } from '@/components/ui/PageWithTOC';

export const metadata: Metadata = {
  title: 'Claude Code Integration | SkillGate',
  description:
    'Apply policy checks to Claude Code workflows. Scan hooks, settings, plugins, and instruction files to block unsafe runtime actions before execution.',
  keywords: [
    'SkillGate Claude Code',
    'Claude Code security',
    'CLAUDE.md policy enforcement',
    'Claude hook security scan',
    'Claude plugin security',
    'instruction file injection',
    'Claude Code safe runtime',
    'agent workspace security',
  ],
  openGraph: {
    title: 'Claude Code Integration | SkillGate',
    description:
      'Apply policy checks to Claude workflows. Block unsafe hooks, settings drift, and instruction file injection before they run.',
    type: 'article',
  },
};

const TOC = [
  { id: 'quick-start', label: 'Quick start' },
  { id: 'repo-scope-vs-user-scope', label: 'Repo vs user scope' },
  { id: 'what-to-protect', label: 'What to protect' },
  { id: 'related-pages', label: 'Related pages' },
];

export default function ClaudeCodeIntegrationPage() {
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
            Claude Code
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Apply policy checks to Claude workflows and block unsafe runtime actions before
            execution.
          </p>
        </div>

        <h2 id="quick-start">Quick start</h2>
        <CodeBlock
          language="bash"
          code={`# Guarded Claude execution
skillgate run --env ci -- claude -p "review this pull request"

# Scan Claude workspace surfaces
skillgate claude scan --directory . --output json`}
        />

        <h2 id="repo-scope-vs-user-scope">Repo scope vs user scope</h2>
        <p>
          Repo scope scans project-level files and settings. User scope covers your global Claude
          configuration and instruction files across all projects.
        </p>
        <CodeBlock
          language="bash"
          code={`# Repo scope
skillgate claude scan --directory . --surface all --output json

# User scope
skillgate claude scan --directory ~/.claude --surface settings,instruction-files --output json`}
        />

        <h2 id="what-to-protect">What to protect</h2>
        <ul>
          <li>Hooks and plugin workflows.</li>
          <li>
            Instruction files such as <code>AGENTS.md</code> and <code>CLAUDE.md</code>.
          </li>
          <li>Settings changes that expand risky permissions.</li>
        </ul>

        <h2 id="related-pages">Related pages</h2>
        <ul>
          <li>
            <Link href="/integrations/skillgate-agents" className="sg-link">
              SkillGate Agents plugin guide
            </Link>
          </li>
          <li>
            <Link href="/cli/claude" className="sg-link">
              claude command reference
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
