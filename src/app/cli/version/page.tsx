import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'version - CLI Reference',
  description: 'Show the installed SkillGate CLI version.',
};

export default function VersionPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>version</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Check the exact SkillGate CLI build installed in your current environment.
          This is usually the first command to run when debugging or validating upgrades.
        </p>
      </div>

      <CodeBlock
        language="bash"
        code={`skillgate version

# Typical output
skillgate 1.2.0`}
      />
    </div>
  );
}
