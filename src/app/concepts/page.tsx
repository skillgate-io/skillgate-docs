import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Badge } from '@/components/ui/Badge';
import { CORE_CATEGORY_COUNT, TOTAL_RULE_COUNT } from '@/lib/rule-catalog';

export const metadata: Metadata = {
  title: 'Core Concepts',
  description: 'How SkillGate helps teams review findings, apply policy, and verify outcomes.',
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
          SkillGate scans AI agent skills for security risks and helps teams block unsafe deployments.
          Results are clear, repeatable, and easy to review.
        </p>
      </div>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>The scan flow</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
          Every scan follows five stages:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '20px' }}>
          {[
            { step: 'Parse', desc: 'Find skill files and load project metadata.' },
            { step: 'Analyze', desc: 'Run language-aware detection rules against each file.' },
            { step: 'Score', desc: 'Calculate a risk score from all findings.' },
            { step: 'Enforce', desc: 'Compare findings and score against your active policy.' },
            { step: 'Report', desc: 'Output human, JSON, or SARIF results. Optionally sign the report.' },
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

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Detection rules</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
          SkillGate includes {TOTAL_RULE_COUNT} registry rules, with {CORE_CATEGORY_COUNT} primary
          categories documented in detail. Each rule has a stable ID, severity, and weight.
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          See the full <Link href="/rules" className="sg-link">Rule Catalog</Link>.
        </p>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Risk scoring</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
          The risk score is the sum of weighted findings. The total is capped at 200 for display.
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
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
          <Badge severity="LOW" /> <Badge severity="MEDIUM" /> <Badge severity="HIGH" /> <Badge severity="CRITICAL" />
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Policy and verification</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
          Policies decide what should fail a scan. Signed reports help teams prove results were not changed.
        </p>
        <CodeBlock
          language="bash"
          code={`skillgate init --preset production
skillgate scan ./my-skill --enforce --policy production
skillgate verify report.json`}
        />
      </section>
    </div>
  );
}
