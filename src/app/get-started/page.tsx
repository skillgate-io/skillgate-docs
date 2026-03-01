import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'Get Started',
  description: 'Install SkillGate, create a policy, run your first enforced scan, and verify the output.',
};

export default function GetStartedPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Getting Started</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Get Started
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Install in minutes, run an enforced scan, and verify trusted output artifacts.
        </p>
      </div>

      <h2>1) Install SkillGate</h2>
      <CodeBlock language="bash" code={`pipx install skillgate\nskillgate version`} />

      <h2>2) Initialize policy</h2>
      <CodeBlock language="bash" code={`skillgate init --preset production`} />

      <h2>3) Scan and enforce</h2>
      <CodeBlock
        language="bash"
        code={`skillgate scan ./my-agent-skill --enforce --policy production\nskillgate scan ./my-agent-skill --format sarif --output skillgate.sarif`}
      />

      <h2>4) Sign and verify</h2>
      <CodeBlock
        language="bash"
        code={`skillgate keys generate\nskillgate scan ./my-agent-skill --sign --output report.json\nskillgate verify report.json`}
      />

      <Callout variant="tip" title="Need install options?">
        See <Link href="/installation" className="sg-link">Installation</Link> for CLI install
        channels, and <Link href="/integrations/language-shims" className="sg-link">Language Shims</Link> for
        Go/Ruby/Rust/.NET/Java clients.
      </Callout>
    </div>
  );
}
