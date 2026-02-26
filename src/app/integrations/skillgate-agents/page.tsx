import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'SkillGate Agents for Claude Code',
  description:
    'Install and use the SkillGate Agents plugin for Claude Code to secure hooks, MCP tools, instruction files, and runtime tool calls.',
};

export default function SkillGateAgentsIntegrationPage() {
  return (
    <div style={{ maxWidth: '760px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Integrations</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          SkillGate Agents for Claude Code
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          SkillGate Agents is the Claude Code plugin package for runtime enforcement and instruction safety.
          It helps secure plugin hooks, MCP tool descriptions, settings drift, and high-risk tool calls.
        </p>
      </div>

      <h2>Install</h2>
      <CodeBlock
        language="bash"
        code={`# Clone plugin repository
git clone https://github.com/skillgate-io/skillgate-agents.git
cd skillgate-agents

# Load plugin for current Claude Code session
claude --plugin-dir ./skillgate-agents

# Optional marketplace install path (when published)
/plugin install skillgate-agents`}
      />

      <h2>Runtime prerequisites</h2>
      <CodeBlock
        language="bash"
        code={`pip install skillgate
skillgate auth
skillgate sidecar start`}
      />

      <h2>Repo scope and user scope</h2>
      <CodeBlock
        language="bash"
        code={`# Repo scope: project-local controls
export SKILLGATE_ORG_ID=<org-id>
export SKILLGATE_WORKSPACE_ID=<workspace-id>
export SKILLGATE_ACTOR_ID=<actor-id-or-email>
skillgate claude scan --scope repo --directory . --surface all --output json

# User scope: workspace+actor namespace
skillgate claude scan --scope user --directory ~/.claude --surface settings,instruction-files --output json`}
      />

      <h2>Use in Claude Code</h2>
      <ul>
        <li>Run `/skillgate-agents:secure-project` to bootstrap guardrails for the current repository.</li>
        <li>Run `/skillgate-agents:audit` to review recent runtime decisions and policy violations.</li>
        <li>Run `/skillgate-agents:check-injection` to scan AGENTS.md, CLAUDE.md, and slash command content.</li>
      </ul>

      <h2>Security coverage</h2>
      <ul>
        <li>MCP tool description injection checks before model exposure.</li>
        <li>Settings drift detection for risky permission expansion.</li>
        <li>Hooks governance for Bash, file writes, web access, and sub-agent task inheritance.</li>
      </ul>

      <h2>References</h2>
      <ul>
        <li><a className="sg-link" href="https://github.com/skillgate-io/skillgate-agents" target="_blank" rel="noreferrer">skillgate-io/skillgate-agents</a></li>
        <li><Link href="/integrations/claude-code" className="sg-link">Claude Code integration</Link></li>
        <li><Link href="/validation-evidence" className="sg-link">Validation evidence</Link></li>
      </ul>
    </div>
  );
}
