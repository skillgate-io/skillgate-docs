import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { CodeBlock } from '@/components/ui/CodeBlock';
import {
  CoreCategoryPrefix,
  CORE_CATEGORY_COUNT,
  getCatalogCoverageSummary,
  getCoveredCoreRuleCount,
  getCategoryRuleCount,
  RULE_CATEGORIES,
  TOTAL_RULE_COUNT,
} from '@/lib/rule-catalog';

export const metadata: Metadata = {
  title: 'Detection Rules',
  description: 'SkillGate rule catalog sourced from the live analyzer registry.',
};

export default function RulesPage() {
  return (
    <div style={{ maxWidth: '860px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Detection Rules</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Rule Catalog
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          SkillGate currently ships with {TOTAL_RULE_COUNT} registry rules. This section covers the
          7 core security categories used most often in policy reviews.
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '12px', marginBottom: '40px',
      }}>
        {[
          { value: String(TOTAL_RULE_COUNT), label: 'Total registry rules' },
          { value: '7', label: 'Languages' },
          { value: String(CORE_CATEGORY_COUNT), label: 'Core categories here' },
          { value: String(getCoveredCoreRuleCount()), label: 'Rules documented in this section' },
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
      <p style={{ color: 'var(--text-muted)', marginTop: '-24px', marginBottom: '32px', fontSize: '0.85rem' }}>
        Coverage note: {getCatalogCoverageSummary()}.
      </p>

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
                { field: 'name', example: 'subprocess_call', desc: 'Rule name.' },
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
          {RULE_CATEGORIES.map((cat) => (
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
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--border)', padding: '1px 6px', borderRadius: '4px' }}>
                  {getCategoryRuleCount(cat.id.split('-')[1] as CoreCategoryPrefix)} rules
                </span>
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
