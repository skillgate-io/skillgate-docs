import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PageWithTOC } from '@/components/ui/PageWithTOC';

export const metadata: Metadata = {
  title: 'SkillGate Agents for Claude Code | SkillGate',
  description:
    'Install the SkillGate Agents Claude Code plugin to secure hooks, MCP tool descriptions, CLAUDE.md, and runtime tool calls - all from inside your Claude session.',
  keywords: [
    'SkillGate Agents Claude Code plugin',
    'Claude Code security plugin',
    'Claude hook enforcement',
    'CLAUDE.md security',
    'MCP injection detection',
    'Claude Code runtime enforcement',
    'AI agent hook governance',
    'slash command security',
  ],
  openGraph: {
    title: 'SkillGate Agents for Claude Code | SkillGate',
    description:
      'Runtime enforcement and instruction safety inside Claude Code. Secure hooks, MCP tools, settings drift, and high-risk tool calls.',
    type: 'article',
  },
};

const TOC = [
  { id: 'install', label: 'Install' },
  { id: 'prerequisites', label: 'Prerequisites' },
  { id: 'scope-setup', label: 'Scope setup' },
  { id: 'use-in-claude-code', label: 'Use in Claude Code' },
  { id: 'security-coverage', label: 'Security coverage' },
  { id: 'references', label: 'References' },
];

export default function SkillGateAgentsIntegrationPage() {
  return (
    <PageWithTOC items={TOC}>
      <div style={{ maxWidth: '760px' }} className="sg-prose">
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
            SkillGate Agents for Claude Code
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
            SkillGate Agents is the Claude Code plugin for runtime enforcement and instruction
            safety. It secures plugin hooks, MCP tool descriptions, settings drift, and high-risk
            tool calls - all from inside your Claude session.
          </p>
        </div>

        <h2 id="install">Install</h2>
        <CodeBlock
          language="bash"
          code={`# Clone the plugin repository
git clone https://github.com/skillgate-io/skillgate-agents.git
cd skillgate-agents

# Load the plugin for the current Claude Code session
claude --plugin-dir ./skillgate-agents

# Marketplace install (when published)
/plugin install skillgate-agents`}
        />

        <h2 id="prerequisites">Prerequisites</h2>
        <p>
          The plugin needs the SkillGate CLI installed, an authenticated session, and the sidecar
          running to serve enforcement decisions.
        </p>
        <CodeBlock
          language="bash"
          code={`pip install skillgate
skillgate auth
skillgate sidecar start`}
        />

        <h2 id="scope-setup">Scope setup</h2>
        <p>
          Set the workspace and actor context before scanning. Repo scope applies project-level
          controls; user scope covers your home directory settings.
        </p>
        <CodeBlock
          language="bash"
          code={`# Repo scope
export SKILLGATE_ORG_ID=<org-id>
export SKILLGATE_WORKSPACE_ID=<workspace-id>
export SKILLGATE_ACTOR_ID=<actor-id-or-email>
skillgate claude scan --scope repo --directory . --surface all --output json

# User scope
skillgate claude scan --scope user --directory ~/.claude --surface settings,instruction-files --output json`}
        />

        <h2 id="use-in-claude-code">Use in Claude Code</h2>
        <ul>
          <li>
            Run <code>/skillgate-agents:secure-project</code> to bootstrap guardrails for the
            current repository.
          </li>
          <li>
            Run <code>/skillgate-agents:audit</code> to review recent runtime decisions and policy
            violations.
          </li>
          <li>
            Run <code>/skillgate-agents:check-injection</code> to scan AGENTS.md, CLAUDE.md, and
            slash command content for injection patterns.
          </li>
        </ul>

        <h2 id="security-coverage">Security coverage</h2>
        <ul>
          <li>MCP tool description injection checks before model exposure.</li>
          <li>Settings drift detection for risky permission expansion.</li>
          <li>
            Hooks governance for Bash, file writes, web access, and sub-agent task inheritance.
          </li>
        </ul>

        <h2 id="references">References</h2>
        <ul>
          <li>
            <a
              className="sg-link"
              href="https://github.com/skillgate-io/skillgate-agents"
              target="_blank"
              rel="noreferrer"
            >
              skillgate-io/skillgate-agents
            </a>
          </li>
          <li>
            <Link href="/integrations/claude-code" className="sg-link">
              Claude Code integration
            </Link>
          </li>
          <li>
            <Link href="/validation-evidence" className="sg-link">
              Validation evidence
            </Link>
          </li>
        </ul>
      </div>
    </PageWithTOC>
  );
}
