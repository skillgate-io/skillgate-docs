import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Secure CI Gating',
  description:
    'Secure pull request and release pipelines with SkillGate CI gating, signed evidence, and deterministic policy outcomes.',
};

export default function UseCaseCiGatingPage() {
  return (
    <div style={{ maxWidth: '740px' }} className="sg-prose">
      <h1>Secure CI Gating</h1>
      <p>
        Use SkillGate in CI to block risky changes before merge. Keep signed evidence linked to every pipeline decision.
      </p>

      <h2>What to protect</h2>
      <ul>
        <li>Pull requests that introduce unsafe shell, network, or file operations.</li>
        <li>Pipeline paths that skip policy checks on generated or script content.</li>
        <li>Release workflows that need consistent pass and fail behavior.</li>
      </ul>

      <h2>Commands to run</h2>
      <CodeBlock
        language="bash"
        code={`# Standard CI enforcement
skillgate scan --enforce --report report.json --format json .

# Verify signed output in a downstream job
skillgate verify report.sig report.json public_key.pem

# Optional runtime gate in integration tests
skillgate run --env ci -- openclaw exec "run integration tests"`}
      />

      <h2>Next step</h2>
      <ul>
        <li><Link href="/integrations/github-actions" className="sg-link">GitHub Actions guide</Link></li>
        <li><Link href="/integrations/gitlab-ci" className="sg-link">GitLab CI guide</Link></li>
      </ul>
    </div>
  );
}
