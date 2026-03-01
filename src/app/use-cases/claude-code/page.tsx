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
        Use this workflow when your team relies on Claude hooks, plugins, and shared instruction files.
      </p>

      <h2>Command order</h2>
      <p><strong>Step 1:</strong> scan Claude surfaces so instruction and hook risks are visible before runtime.</p>
      <CodeBlock language="bash" code={`skillgate claude scan --directory . --surface all --output json`} />

      <p><strong>Step 2:</strong> run guarded execution for day-to-day prompts.</p>
      <CodeBlock language="bash" code={`skillgate run --env ci -- claude -p "review this pull request"`} />

      <p><strong>Step 3:</strong> enforce approval checks for protected files in CI.</p>
      <CodeBlock
        language="bash"
        code={`skillgate claude approvals baseline --directory .
skillgate claude approvals check --directory . --ci`}
      />

      <h2>Why this order works</h2>
      <ul>
        <li>Static risk is handled before interactive runtime usage.</li>
        <li>Runtime controls block unsafe actions at execution time.</li>
        <li>Approval checks keep sensitive config changes auditable.</li>
      </ul>

      <h2>Next step</h2>
      <ul>
        <li><Link href="/integrations/claude-code" className="sg-link">Claude Code integration guide</Link></li>
        <li><Link href="/validation-evidence" className="sg-link">Validation evidence</Link></li>
      </ul>
    </div>
  );
}
