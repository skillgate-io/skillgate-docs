import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Protect Codex CLI',
  description:
    'Protect Codex CLI sessions with SkillGate policy checks, provider trust controls, and CI guard mode.',
};

export default function UseCaseCodexPage() {
  return (
    <div style={{ maxWidth: '740px' }} className="sg-prose">
      <h1>Protect Codex CLI</h1>
      <p>
        Use this workflow when you want local development and CI runs to follow the same policy gates.
      </p>

      <h2>Command order</h2>
      <p><strong>Step 1:</strong> run Codex with default guarded execution in your repository.</p>
      <CodeBlock language="bash" code={`skillgate codex --directory . exec "review this repository"`} />

      <p><strong>Step 2:</strong> run CI mode for stricter automated checks.</p>
      <CodeBlock language="bash" code={`skillgate codex --ci --output sarif --directory . exec "run release checks"`} />

      <p><strong>Step 3:</strong> run direct runtime wrap for production-like preflight control.</p>
      <CodeBlock language="bash" code={`skillgate run --env prod --reputation-store .skillgate/reputation/reputation.json -- codex exec "deploy release"`} />

      <h2>Why this order works</h2>
      <ul>
        <li>Developers get immediate feedback during local work.</li>
        <li>CI applies deterministic gates with machine-readable output.</li>
        <li>Production paths use runtime preflight checks before tool execution.</li>
      </ul>

      <h2>Next step</h2>
      <ul>
        <li><Link href="/integrations/codex-cli" className="sg-link">Codex CLI integration guide</Link></li>
        <li><Link href="/validation-evidence" className="sg-link">Validation evidence</Link></li>
      </ul>
    </div>
  );
}
