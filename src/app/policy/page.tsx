import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Policy Reference',
  description: 'SkillGate policy schema, built-in presets, and enforcement behavior.',
};

const PRESETS = [
  {
    name: 'development',
    desc: 'Lower strictness for early iteration. Fails only on CRITICAL findings.',
    failOn: ['critical'],
    maxScore: 150,
  },
  {
    name: 'staging',
    desc: 'Stronger gates before promoting to production. Fails on HIGH and CRITICAL.',
    failOn: ['high', 'critical'],
    maxScore: 90,
  },
  {
    name: 'production',
    desc: 'Production-ready guardrails. Fails on HIGH and CRITICAL, plus shell and injection categories.',
    failOn: ['high', 'critical'],
    maxScore: 70,
  },
  {
    name: 'strict',
    desc: 'Maximum guardrails for high-assurance environments. Fails on MEDIUM, HIGH, and CRITICAL.',
    failOn: ['medium', 'high', 'critical'],
    maxScore: 30,
  },
];

export default function PolicyPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Policy</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Policy Reference
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          SkillGate applies policy checks consistently. A policy defines what findings cause a scan to fail - 
          by severity level, by category, or by total risk score.
        </p>
      </div>

      {/* Schema */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Schema</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Policy files use a versioned YAML schema. Place a <code>skillgate.yml</code> in your project root to activate it.
          Run <code>skillgate init</code> to generate a starter file.
        </p>
        <CodeBlock
          language="yaml"
          filename="skillgate.yml"
          code={`version: "1"

# Fail if any finding matches these severities
fail_on:
  severity: ["high", "critical"]
  # Fail if any finding belongs to these categories
  categories: ["shell", "injection"]

# Fail if the total risk score exceeds this value
threshold:
  max_score: 70`}
        />
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginTop: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--sidebar-bg)' }}>
                {['Field', 'Type', 'Description'].map((h) => (
                  <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { field: 'version', type: 'string', desc: 'Schema version. Must be "1".' },
                { field: 'fail_on.severity', type: 'string[]', desc: 'Fail if any finding has this severity. Values: low, medium, high, critical.' },
                { field: 'fail_on.categories', type: 'string[]', desc: 'Fail if any finding belongs to this category. Values: shell, network, filesystem, eval, credential, injection, obfuscation.' },
                { field: 'threshold.max_score', type: 'integer', desc: 'Fail if the total risk score exceeds this value. Range: 0–200.' },
              ].map((row, i) => (
                <tr key={row.field} style={{ borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--accent)' }}>{row.field}</td>
                  <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{row.type}</td>
                  <td style={{ padding: '8px 14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Resolution order */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Resolution order</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.9rem', lineHeight: 1.7 }}>
          When multiple policy sources are active, they resolve in this priority order (highest wins):
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {[
            { n: '1', label: 'CLI flags', desc: '--policy, --enforce, and related flags override everything.', highlight: false },
            { n: '2', label: 'Project skillgate.yml', desc: 'A skillgate.yml in your project root overrides presets.', highlight: false },
            { n: '3', label: 'Named preset', desc: 'development, staging, production, or strict built-in preset.', highlight: false },
            { n: '4', label: 'Built-in defaults', desc: 'Lowest priority - no enforcement by default without a preset.', highlight: false },
          ].map((s, i) => (
            <div key={s.n} style={{
              display: 'flex', gap: '16px', padding: '12px 16px',
              background: 'var(--sidebar-bg)',
              borderRadius: i === 0 ? '8px 8px 0 0' : i === 3 ? '0 0 8px 8px' : '0',
              border: '1px solid var(--border)',
              borderTop: i === 0 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', width: '20px', flexShrink: 0, paddingTop: '2px' }}>{s.n}.</span>
              <div>
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>{s.label}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginLeft: '8px' }}>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Presets */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Built-in presets</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
          Use a preset with <code>--policy &lt;preset-name&gt;</code> or set it in your <code>skillgate.yml</code>:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {PRESETS.map((preset) => (
            <div key={preset.name} style={{
              padding: '18px 20px', borderRadius: '10px',
              border: '1px solid var(--border)', background: 'var(--sidebar-bg)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <code style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent)', fontSize: '0.9rem' }}>{preset.name}</code>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--border)', padding: '1px 6px', borderRadius: '4px' }}>
                  max_score: {preset.maxScore}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '10px', lineHeight: 1.6 }}>{preset.desc}</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {preset.failOn.map((s) => (
                  <Badge key={s} severity={s.toUpperCase() as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage in CI */}
      <section>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Usage in CI</h2>
        <CodeBlock
          language="bash"
          code={`# Use a preset
skillgate scan ./skill --enforce --policy production

# Use a custom policy file
skillgate scan ./skill --enforce --policy ./skillgate.yml

# Quiet mode: exit code only, no output
skillgate scan ./skill --enforce --policy strict --quiet`}
        />
        <Callout variant="info">
          Without <code>--enforce</code>, policy violations are reported but the process exits with code 0.
          Add <code>--enforce</code> to block CI on violations.
        </Callout>
      </section>
    </div>
  );
}
