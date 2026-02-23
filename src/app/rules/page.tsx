import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Detection Rules',
  description: 'SkillGate rule catalog: 119 deterministic static analysis rules across 7 languages and 7 categories.',
};

const CATEGORIES = [
  {
    id: 'SG-SHELL-*',
    label: 'Shell',
    href: '/rules/shell',
    count: '30+',
    desc: 'Subprocess spawning, OS-level command execution, pipe chaining, and destructive shell operations.',
    examples: ['subprocess.run()', 'os.system()', 'child_process.exec()', 'Runtime.exec()'],
  },
  {
    id: 'SG-NET-*',
    label: 'Network',
    href: '/rules/network',
    count: '20+',
    desc: 'Network egress, DNS lookups, HTTP callbacks, raw socket connections, and data exfiltration patterns.',
    examples: ['urllib.request', 'fetch()', 'net.Socket', 'dns.resolve()'],
  },
  {
    id: 'SG-FS-*',
    label: 'Filesystem',
    href: '/rules/filesystem',
    count: '15+',
    desc: 'Filesystem writes, destructive deletes, and access to sensitive paths like /etc/passwd or ~/.ssh.',
    examples: ['open(..., "w")', 'fs.writeFile()', 'shutil.rmtree()', '/etc/shadow'],
  },
  {
    id: 'SG-EVAL-*',
    label: 'Eval',
    href: '/rules/eval',
    count: '12+',
    desc: 'Dynamic code execution, runtime evaluation, pickle deserialization, and unsafe template rendering.',
    examples: ['eval()', 'exec()', 'pickle.loads()', '__import__()'],
  },
  {
    id: 'SG-CRED-*',
    label: 'Credentials',
    href: '/rules/credentials',
    count: '10+',
    desc: 'Hardcoded credentials, secret exposure in logs, token leakage, and environment variable exfiltration.',
    examples: ['password =', 'api_key =', 'SECRET_KEY', 'Authorization: Bearer'],
  },
  {
    id: 'SG-INJ-*',
    label: 'Injection',
    href: '/rules/injection',
    count: '12+',
    desc: 'Prompt injection, SQL injection, command injection, and unsafe input-to-execution data flows.',
    examples: ['f"SELECT {user}"', 'f"rm {path}"', 'system(input)', 'prompt + user_text'],
  },
  {
    id: 'SG-OBF-*',
    label: 'Obfuscation',
    href: '/rules/obfuscation',
    count: '8+',
    desc: 'Base64-encoded payloads, ROT13, hex encoding, and other anti-analysis indicators.',
    examples: ['base64.b64decode()', 'codecs.decode()', 'eval(atob())', '\\x41\\x42\\x43'],
  },
];

export default function RulesPage() {
  return (
    <div style={{ maxWidth: '860px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Detection Rules</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Rule Catalog
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          119 deterministic static analysis rules across 7 languages (Python, JavaScript, TypeScript, Shell, Go, Rust, Ruby)
          and 7 risk categories. Every rule has a stable ID and fires only on relevant file types.
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '12px', marginBottom: '40px',
      }}>
        {[
          { value: '119', label: 'Total rules' },
          { value: '7', label: 'Languages' },
          { value: '7', label: 'Categories' },
          { value: '0', label: 'False negatives on canonical patterns' },
        ].map((s) => (
          <div key={s.label} style={{
            padding: '16px', borderRadius: '8px',
            border: '1px solid var(--border)', background: 'var(--sidebar-bg)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent)' }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Rule metadata */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Rule metadata</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.9rem' }}>Every rule exposes the following fields:</p>
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--sidebar-bg)' }}>
                {['Field', 'Example', 'Description'].map((h) => (
                  <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { field: 'id', example: 'SG-SHELL-001', desc: 'Stable rule identifier.' },
                { field: 'name', example: 'subprocess_call', desc: 'Internal rule name.' },
                { field: 'description', example: 'Direct subprocess execution detected', desc: 'Human-readable summary.' },
                { field: 'severity', example: 'HIGH', desc: 'LOW, MEDIUM, HIGH, or CRITICAL.' },
                { field: 'weight', example: '40', desc: 'Risk score contribution (0–100).' },
                { field: 'category', example: 'SHELL', desc: 'Rule category.' },
              ].map((row, i) => (
                <tr key={row.field} style={{ borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--accent)' }}>{row.field}</td>
                  <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.example}</td>
                  <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Scoring formula */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Scoring formula</h2>
        <CodeBlock
          language="text"
          code={`score = Σ(finding.weight × severity_multiplier)

LOW      × 0.5    MEDIUM   × 1.0
HIGH     × 1.5    CRITICAL × 2.0

Score cap: 200`}
        />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge severity="LOW" /> <Badge severity="MEDIUM" /> <Badge severity="HIGH" /> <Badge severity="CRITICAL" />
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Categories</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              style={{
                display: 'block', padding: '20px 24px',
                borderRadius: '10px', border: '1px solid var(--border)',
                background: 'var(--sidebar-bg)', textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <code style={{ fontSize: '0.85rem', color: 'var(--accent)', fontFamily: 'monospace', fontWeight: 600 }}>{cat.id}</code>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--border)', padding: '1px 6px', borderRadius: '4px' }}>{cat.count} rules</span>
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{cat.label}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.6 }}>{cat.desc}</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {cat.examples.map((ex) => (
                  <code key={ex} style={{
                    fontSize: '0.72rem', padding: '2px 6px', borderRadius: '4px',
                    background: 'var(--border)', color: 'var(--text-muted)', fontFamily: 'monospace',
                  }}>{ex}</code>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
