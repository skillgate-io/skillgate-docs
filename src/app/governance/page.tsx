import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Governance',
  description: 'Roll out policy across repositories with simulation and change checks.',
};

export default function GovernancePage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Governance</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Governance
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Apply one policy model across repositories and teams using simulation, baselines, and CI checks.
        </p>
      </div>

      <h2>Fleet scan</h2>
      <CodeBlock
        language="bash"
        code={`skillgate scan ./agents --fleet --policy production --output json\nskillgate scan ./agents --fleet --require-skill-manifest --fail-on-threshold 10`}
      />

      <h2>Org-scale simulation</h2>
      <CodeBlock
        language="bash"
        code={`skillgate simulate --org "./repos/acme/*" --policy strict --output json\nskillgate simulate --org "github:acme/*" --policy production --output json`}
      />

      <h2>Change baseline and checks</h2>
      <CodeBlock
        language="bash"
        code={`skillgate drift baseline ./agents --fleet --output .skillgate/drift/baseline.json\nskillgate drift check ./agents --fleet --baseline .skillgate/drift/baseline.json --fail-on-drift`}
      />
    </div>
  );
}
