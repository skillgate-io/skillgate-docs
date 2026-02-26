import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Claude Code Integration',
  description: 'Use SkillGate with Claude Code and local AI agent workflows to protect hooks, settings, plugins, and instruction files.',
};

export default function ClaudeCodeIntegrationPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Integrations</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Claude Code
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Apply policy checks to Claude workflows and block unsafe runtime actions before execution.
        </p>
      </div>

      <h2>Quick start</h2>
      <CodeBlock
        language="bash"
        code={`# Guarded Claude execution
skillgate run --env ci -- claude -p "review this pull request"

# Scan Claude workspace surfaces
skillgate claude scan --directory . --output json`}
      />

      <h2>Repo scope vs user scope</h2>
      <CodeBlock
        language="bash"
        code={`# Repo scope
skillgate claude scan --directory . --surface all --output json

# User scope
skillgate claude scan --directory ~/.claude --surface settings,instruction-files --output json`}
      />

      <h2>What to protect</h2>
      <ul>
        <li>Hooks and plugin workflows.</li>
        <li>Instruction files such as AGENTS.md and CLAUDE.md.</li>
        <li>Settings changes that expand risky permissions.</li>
      </ul>

      <h2>Related pages</h2>
      <ul>
        <li><Link href="/integrations/skillgate-agents" className="sg-link">SkillGate Agents plugin guide</Link></li>
        <li><Link href="/cli/claude" className="sg-link">claude command reference</Link></li>
        <li><Link href="/agent-gateway" className="sg-link">Agent Gateway</Link></li>
      </ul>
    </div>
  );
}
