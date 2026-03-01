import { Badge } from './Badge';

type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface RuleRow {
  id: string;
  name: string;
  description: string;
  severity: Severity;
  weight: number;
  languages?: string;
}

interface RuleCategoryPageProps {
  category: string;
  categoryId: string;
  description: string;
  languages: string[];
  rules: RuleRow[];
}

export function RuleCategoryPage({ category, categoryId, description, languages, rules }: RuleCategoryPageProps) {
  return (
    <div style={{ maxWidth: '900px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Detection Rules
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          {category} Rules
          <code style={{ fontSize: '1rem', marginLeft: '12px', color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 400 }}>
            {categoryId}
          </code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          {description}
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
          {languages.map((lang) => (
            <span key={lang} style={{
              fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px',
              background: 'var(--sidebar-bg)', border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}>{lang}</span>
          ))}
        </div>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>Category overview</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.7 }}>
        Review these rules when you tune policy thresholds and investigate findings in this category.
      </p>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Rule list</h2>

      <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', fontSize: '0.85rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Rule ID', 'Name', 'Description', 'Severity', 'Weight'].map((h) => (
                <th key={h} style={{
                  padding: '10px 14px', textAlign: 'left',
                  color: 'var(--text-muted)', fontWeight: 600,
                  fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                  borderBottom: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, i) => (
              <tr
                key={rule.id}
                style={{ borderBottom: i < rules.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap', fontWeight: 600 }}>{rule.id}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{rule.name}</td>
                <td style={{ padding: '10px 14px', color: 'var(--text)', lineHeight: 1.5 }}>{rule.description}</td>
                <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}><Badge severity={rule.severity} /></td>
                <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right' }}>{rule.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
