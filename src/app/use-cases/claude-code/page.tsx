import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Protect Claude Code',
  description:
    'Secure Claude Code workflows by enforcing policy on hooks, settings, plugins, and instruction files before execution.',
};

export default function UseCaseClaudePage() {
  return (
    <div style={{ maxWidth: '740px' }} className="sg-prose">
      <h1>Protect Claude Code</h1>
      <p>
        Route Claude operations through SkillGate checks and scan Claude workspace surfaces so risky config changes do not silently expand permissions.
      </p>

      <h2>What to protect</h2>
      <ul>
        <li>Hooks and plugin workflows.</li>
        <li>Instruction files such as AGENTS.md and CLAUDE.md.</li>
        <li>Settings files that expand risky permissions.</li>
      </ul>

      <h2>Commands to run</h2>
      <CodeBlock
        language="bash"
        code={`# Guarded execution
skillgate run --env ci -- claude -p "review this pull request"

# Scan Claude surfaces
skillgate claude scan --directory . --surface all --output json`}
      />

      <h2>Next step</h2>
      <ul>
        <li><Link href="/integrations/claude-code" className="sg-link">Claude Code integration guide</Link></li>
        <li><Link href="/validation-evidence" className="sg-link">Validation evidence</Link></li>
      </ul>
    </div>
  );
}
