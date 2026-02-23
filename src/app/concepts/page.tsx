import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Core Concepts',
  description: 'How SkillGate works: detection rules, risk scoring, policy enforcement, and signed attestations.',
};

export default function ConceptsPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Getting Started</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Core Concepts
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          SkillGate uses deterministic static analysis to scan AI agent skills for security risks and block unsafe deployments.
          No machine learning — every result is reproducible and auditable.
        </p>
      </div>

      {/* Pipeline */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>The scan pipeline</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
          Every scan flows through five deterministic stages:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '20px' }}>
          {[
            { step: 'Parse', desc: 'Discover skill files, extract manifest (SKILL.md, skill.json, package.json, pyproject.toml), unpack archives.' },
            { step: 'Analyze', desc: 'Run detection rules against each file. Python uses stdlib AST; JavaScript/TypeScript/Shell use tree-sitter; other languages use regex with language-scoped pre-filters.' },
            { step: 'Score', desc: 'Compute a weighted risk score from all findings.' },
            { step: 'Enforce', desc: 'Compare the score and finding severities against the active policy. Emit pass or fail.' },
            { step: 'Report', desc: 'Produce human-readable, JSON, or SARIF output. Optionally sign the report with Ed25519.' },
          ].map((s, i) => (
            <div key={s.step} style={{
              display: 'flex', gap: '16px', alignItems: 'flex-start',
              padding: '14px 16px',
              background: 'var(--sidebar-bg)',
              borderRadius: i === 0 ? '8px 8px 0 0' : i === 4 ? '0 0 8px 8px' : '0',
              border: '1px solid var(--border)',
              borderTop: i === 0 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'var(--accent)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, marginTop: '2px',
              }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>{s.step}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detection rules */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Detection rules</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
          SkillGate ships with 119 rules across 7 categories. Each rule has a stable ID, severity, and weight.
          Rules only fire on files that match their language scope — a Shell rule never triggers on a Python file.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px', marginBottom: '20px',
        }}>
          {[
            { id: 'SG-SHELL-*', label: 'Shell', desc: 'subprocess, os.system, eval with shell=True', href: '/rules/shell' },
            { id: 'SG-NET-*', label: 'Network', desc: 'egress, DNS, HTTP callbacks, raw sockets', href: '/rules/network' },
            { id: 'SG-FS-*', label: 'Filesystem', desc: 'writes, deletes, sensitive paths', href: '/rules/filesystem' },
            { id: 'SG-EVAL-*', label: 'Eval', desc: 'dynamic code execution, pickle, exec', href: '/rules/eval' },
            { id: 'SG-CRED-*', label: 'Credentials', desc: 'secrets, tokens, env leakage', href: '/rules/credentials' },
            { id: 'SG-INJ-*', label: 'Injection', desc: 'prompt injection, SQL, command injection', href: '/rules/injection' },
            { id: 'SG-OBF-*', label: 'Obfuscation', desc: 'base64, rot13, anti-analysis', href: '/rules/obfuscation' },
          ].map((r) => (
            <Link key={r.id} href={r.href} style={{
              display: 'block', padding: '14px 16px', borderRadius: '8px',
              border: '1px solid var(--border)', background: 'var(--sidebar-bg)',
              textDecoration: 'none',
            }}>
              <code style={{ fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'monospace' }}>{r.id}</code>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)', marginTop: '4px' }}>{r.label}</div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.5 }}>{r.desc}</div>
            </Link>
          ))}
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          See the full <Link href="/rules" className="sg-link">Rule Catalog</Link> for all 119 rules.
        </p>
      </section>

      {/* Scoring */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Risk scoring</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
          The risk score is the sum of weighted findings. Each finding contributes its rule weight multiplied by a severity factor. The total is capped at 200 for display.
        </p>
        <CodeBlock
          language="text"
          code={`score = Σ(finding.weight × severity_multiplier)

Severity multipliers:
  LOW      × 0.5
  MEDIUM   × 1.0
  HIGH     × 1.5
  CRITICAL × 2.0

Score cap: 200`}
        />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.8 }}>
          Weights range from 10 (informational) to 100 (critical pattern). A single CRITICAL finding at weight 80
          contributes 160 points — enough to fail most policy presets.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
          <Badge severity="LOW" /> <Badge severity="MEDIUM" /> <Badge severity="HIGH" /> <Badge severity="CRITICAL" />
        </div>
      </section>

      {/* Policy */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Policy enforcement</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
          A policy defines what findings cause a scan to fail. Policies use a versioned YAML schema and resolve in priority order:
        </p>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '4px',
          padding: '16px', background: 'var(--sidebar-bg)',
          border: '1px solid var(--border)', borderRadius: '8px',
          marginBottom: '16px', fontSize: '0.875rem', color: 'var(--text-muted)',
        }}>
          {['Built-in defaults', 'Preset (development / staging / production / strict)', 'Project skillgate.yml', 'CLI flags (highest priority)'].map((s, i) => (
            <div key={s} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', width: '16px' }}>{i + 1}.</span>
              <span style={{ color: i === 3 ? 'var(--text)' : 'var(--text-muted)', fontWeight: i === 3 ? 500 : 400 }}>{s}</span>
            </div>
          ))}
        </div>
        <CodeBlock
          language="yaml"
          filename="skillgate.yml"
          code={`version: "1"
fail_on:
  severity: ["high", "critical"]
  categories: ["shell", "injection"]
threshold:
  max_score: 70`}
        />
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Full schema and all presets in the <Link href="/policy" className="sg-link">Policy Reference</Link>.
        </p>
      </section>

      {/* Attestations */}
      <section>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Signed attestations</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
          Scan reports can be signed with an Ed25519 keypair managed by SkillGate. The report is serialized as canonical JSON
          (sorted keys, no whitespace), hashed with SHA-256, then signed. Anyone with your public key can verify the report has not been tampered with.
        </p>
        <CodeBlock
          language="bash"
          code={`# Generate a keypair
skillgate keys generate

# Scan and sign the report
skillgate scan ./my-skill --sign --report-file report.json

# Verify a signed report
skillgate verify report.json`}
        />
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Private keys stay on your machine in <code>~/.skillgate/keys/</code> and are never sent anywhere.
        </p>
      </section>
    </div>
  );
}
