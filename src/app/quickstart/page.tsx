import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'Quickstart',
  description: 'Scan your first AI agent skill with SkillGate in under 5 minutes.',
};

export default function QuickstartPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Getting Started
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Quickstart
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Get SkillGate installed and scan your first skill in under 5 minutes.
        </p>
      </div>

      {/* Step 1 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
          }}>1</span>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>Install SkillGate</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
          The recommended install method is <strong style={{ color: 'var(--text)' }}>pipx</strong>, which installs SkillGate in an isolated environment.
        </p>
        <CodeBlock language="bash" code="pipx install skillgate" />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Don&apos;t have pipx? Run <code>pip install pipx</code> first, or see all{' '}
          <Link href="/installation" className="sg-link">installation options</Link>.
        </p>
      </div>

      {/* Step 2 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
          }}>2</span>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>Set your API key</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
          SkillGate requires an API key for entitlement. Get a free key at{' '}
          <a href="https://skillgate.io" target="_blank" rel="noopener noreferrer" className="sg-link">skillgate.io</a>.
        </p>
        <CodeBlock
          language="bash"
          code={`export SKILLGATE_API_KEY="sg_free_your_key_here"`}
        />
        <Callout variant="tip" title="Persist the key">
          Add the export to your <code>~/.zshrc</code> or <code>~/.bashrc</code> so it survives new terminal sessions.
        </Callout>
      </div>

      {/* Step 3 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
          }}>3</span>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>Verify the install</h2>
        </div>
        <CodeBlock language="bash" code="skillgate version" />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          You should see the version number and build metadata.
        </p>
      </div>

      {/* Step 4 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
          }}>4</span>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>Scan a skill</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
          Point SkillGate at any skill directory. It will analyze all source files and produce a risk report.
        </p>
        <CodeBlock
          language="bash"
          code={`skillgate scan ./my-skill`}
        />
        <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
          For JSON output (useful for programmatic consumption):
        </p>
        <CodeBlock
          language="bash"
          code={`skillgate scan ./my-skill --output json`}
        />
      </div>

      {/* Step 5 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
          }}>5</span>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>Enable enforcement</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
          Add <code>--enforce</code> to block deployments when policy violations are found. The process exits with code 1 on any violation.
        </p>
        <CodeBlock
          language="bash"
          code={`skillgate scan ./my-skill --enforce --policy production`}
        />
        <Callout variant="info">
          The <code>production</code> preset blocks on HIGH and CRITICAL severity findings. See{' '}
          <Link href="/policy" className="sg-link">Policy Reference</Link> for all presets.
        </Callout>
      </div>

      {/* Next steps */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px',
        }}
      >
        {[
          { href: '/installation', label: 'All install methods', desc: 'brew, winget, npm, Docker' },
          { href: '/cli/scan', label: 'scan reference', desc: 'All flags and output formats' },
          { href: '/integrations/github-actions', label: 'GitHub Actions', desc: 'Block CI on violations' },
          { href: '/rules', label: 'Rule catalog', desc: '119 rules across 7 languages' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: 'block',
              padding: '14px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--sidebar-bg)',
              textDecoration: 'none',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--accent)', marginBottom: '2px' }}>
              {link.label}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{link.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
