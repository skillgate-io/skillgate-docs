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
        Use SkillGate to govern Codex CLI before tools execute. This keeps local sessions and CI runs aligned to your policy.
      </p>

      <h2>What to protect</h2>
      <ul>
        <li>Shell, file write, and network tool calls from Codex sessions.</li>
        <li>Settings changes that expand allowed commands or trusted providers.</li>
        <li>Instruction files such as AGENTS.md and codex.md that can carry injected prompts.</li>
      </ul>

      <h2>Commands to run</h2>
      <CodeBlock
        language="bash"
        code={`# Run Codex through SkillGate in local development
skillgate codex -- codex

# CI guard mode with fail-closed provider controls
skillgate codex --ci-guard -- codex exec "review pull request"

# Scan Codex instruction surfaces
skillgate codex scan --directory . --output json`}
      />

      <h2>Next step</h2>
      <ul>
        <li><Link href="/integrations/codex-cli" className="sg-link">Codex CLI integration guide</Link></li>
        <li><Link href="/validation-evidence" className="sg-link">Validation evidence</Link></li>
      </ul>
    </div>
  );
}
