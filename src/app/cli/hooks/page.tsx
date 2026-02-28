import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'hooks - CLI Reference',
  description: 'Install and manage git pre-commit hooks that run SkillGate before each commit.',
};

export default function HooksPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>hooks</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Install or remove git pre-commit hooks that automatically run a scan before each commit.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Subcommands</h2>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>hooks install</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem' }}>
          Install the pre-commit hook in the current git repository.
        </p>
        <CodeBlock language="bash" code={`skillgate hooks install\n\n# Install with a specific policy\nskillgate hooks install --policy production`} />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>hooks uninstall</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem' }}>Remove the pre-commit hook.</p>
        <CodeBlock language="bash" code="skillgate hooks uninstall" />
      </div>

      <Callout variant="info">
        The hook runs <code>skillgate scan</code> on changed files only. It blocks the commit if any violations are found at the configured severity level.
      </Callout>
    </div>
  );
}
