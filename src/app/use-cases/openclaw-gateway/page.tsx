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
        Use this workflow when OpenClaw tool calls can execute shell commands, change files, or make outbound network calls.
      </p>

      <h2>Command order</h2>
      <p><strong>Step 1:</strong> initialize local reputation once for the repository.</p>
      <CodeBlock language="bash" code={`skillgate reputation init --store .skillgate/reputation/reputation.json`} />

      <p><strong>Step 2:</strong> run OpenClaw through CI-grade runtime enforcement.</p>
      <CodeBlock language="bash" code={`skillgate run --env ci --reputation-store .skillgate/reputation/reputation.json -- openclaw exec "review changed files"`} />

      <p><strong>Step 3:</strong> run strict mode before release-sensitive actions.</p>
      <CodeBlock language="bash" code={`skillgate run --env strict --reputation-store .skillgate/reputation/reputation.json -- openclaw exec "prepare release config"`} />

      <p><strong>Step 4:</strong> verify runtime evidence when your process requires attested records.</p>
      <CodeBlock language="bash" code={`skillgate dag verify .skillgate/runtime/session.json`} />

      <h2>Why this order works</h2>
      <ul>
        <li>First run setup is done once and reused.</li>
        <li>Runtime policy checks happen before risky commands execute.</li>
        <li>Release paths can use stricter controls without changing developer flow.</li>
      </ul>

      <h2>Next step</h2>
      <ul>
        <li><Link href="/integrations" className="sg-link">Integrations overview</Link></li>
        <li><Link href="/validation-evidence" className="sg-link">Validation evidence</Link></li>
      </ul>
    </div>
  );
}
