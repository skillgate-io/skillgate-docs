import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Protect OpenClaw Gateway',
  description:
    'Secure local OpenClaw gateway workflows with SkillGate runtime enforcement, approvals, and signed execution records.',
};

export default function UseCaseOpenClawPage() {
  return (
    <div style={{ maxWidth: '740px' }} className="sg-prose">
      <h1>Protect OpenClaw Gateway</h1>
      <p>
        Use SkillGate as the execution guard in front of OpenClaw. This catches risky shell, network, and file operations before tools run.
      </p>

      <h2>What to protect</h2>
      <ul>
        <li>Tool calls that can change files or execute shell commands.</li>
        <li>Network egress from agent tools in local environments.</li>
        <li>Execution paths that bypass your expected repository scope.</li>
      </ul>

      <h2>Commands to run</h2>
      <CodeBlock
        language="bash"
        code={`# Run OpenClaw through SkillGate
skillgate run --env ci -- openclaw exec "review changed files"

# Enforce stricter runtime policy for sensitive tasks
skillgate run --env strict -- openclaw exec "prepare release config"

# Verify session evidence
skillgate dag verify .skillgate/runtime/session.json`}
      />

      <h2>Next step</h2>
      <ul>
        <li><Link href="/integrations" className="sg-link">Integrations overview</Link></li>
        <li><Link href="/validation-evidence" className="sg-link">Validation evidence</Link></li>
      </ul>
    </div>
  );
}
