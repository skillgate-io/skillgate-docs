import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'rules - CLI Reference',
  description: 'List SkillGate detection rules, filter by category, and output JSON for automation workflows.',
};

export default function RulesPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>rules</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Use this command to see exactly what SkillGate detects before you enforce a policy.
          You can list everything, filter by one category, or export machine-readable JSON.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate rules [--category <name>] [--output human|json]`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>Supported categories</h2>
      <CodeBlock language="text" code={`shell, network, filesystem, eval, credential, injection, obfuscation`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>Examples</h2>
      <CodeBlock
        language="bash"
        code={`# List every detection rule in terminal output
skillgate rules

# Show only shell rules
skillgate rules --category shell

# Export rules as JSON for automation
skillgate rules --output json > skillgate-rules.json`}
      />

      <p style={{ color: 'var(--text-muted)', marginTop: '16px', lineHeight: 1.7 }}>
        For detailed rule-by-rule guidance and examples, see the{' '}
        <Link href="/rules" className="sg-link">Detection Rules catalog</Link>.
      </p>
    </div>
  );
}
