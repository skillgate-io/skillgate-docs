import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'init — CLI Reference',
  description: 'Initialize a SkillGate policy configuration file.',
};

export default function InitPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>init</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Generate a <code>skillgate.yml</code> policy configuration file in the current directory.
        </p>
      </div>

      <CodeBlock language="bash" code="skillgate init [options]" />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>Options</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              <th style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Flag</th>
              <th style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { flag: '--preset <name>', desc: 'Start from a preset: development, staging, production, or strict.' },
              { flag: '--force', desc: 'Overwrite an existing skillgate.yml without prompting.' },
            ].map((row, i) => (
              <tr key={row.flag} style={{ borderBottom: i < 1 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{row.flag}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Example output</h2>
      <CodeBlock
        language="yaml"
        filename="skillgate.yml"
        code={`version: "1"
fail_on:
  severity: ["high", "critical"]
  categories: []
threshold:
  max_score: 70`}
      />
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        See the full schema in <Link href="/policy" className="sg-link">Policy Reference</Link>.
      </p>
    </div>
  );
}
