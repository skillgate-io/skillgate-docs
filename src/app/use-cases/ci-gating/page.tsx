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
        Use this workflow when you need consistent pass and fail policy decisions in pull requests and release pipelines.
      </p>

      <h2>Command order</h2>
      <p><strong>Step 1:</strong> run an enforced scan and save machine-readable output for CI artifacts.</p>
      <CodeBlock
        language="bash"
        code={`skillgate scan ./my-skill \\
  --enforce \\
  --policy production \\
  --output json \\
  --report-file /tmp/scan-report.json`}
      />

      <p><strong>Step 2:</strong> verify signed evidence before downstream jobs consume the report.</p>
      <CodeBlock language="bash" code={`skillgate verify /tmp/scan-report.json`} />

      <p><strong>Step 3:</strong> submit the report so security and compliance teams can query history.</p>
      <CodeBlock language="bash" code={`skillgate submit-scan /tmp/scan-report.json`} />

      <h2>Why this order works</h2>
      <ul>
        <li>Policy enforcement happens before merge.</li>
        <li>Verification protects downstream automation from tampered artifacts.</li>
        <li>Historical storage supports audits and retroscans.</li>
      </ul>

      <h2>Next step</h2>
      <ul>
        <li><Link href="/integrations/github-actions" className="sg-link">GitHub Actions guide</Link></li>
        <li><Link href="/integrations/gitlab-ci" className="sg-link">GitLab CI guide</Link></li>
      </ul>
    </div>
  );
}
