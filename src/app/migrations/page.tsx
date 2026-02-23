import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Migrations',
  description: 'Upgrade guidance for self-hosted SkillGate deployments.',
};

export default function MigrationsPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>More</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Migrations
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Steps for upgrading self-hosted SkillGate deployments safely and predictably.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Database upgrade</h2>
      <CodeBlock language="bash" code={`alembic upgrade head

# Optional: rollback test in staging before applying to production
# alembic downgrade -1
# alembic upgrade head`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Release steps</h2>
      <CodeBlock language="bash" code={`pip install -e ".[api,worker]"
npm --prefix web-ui run build
# Restart API and worker services`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>When to roll back</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 2.2, paddingLeft: '20px', marginBottom: '32px' }}>
        {[
          'Core user flows fail after deploy: auth, scan, or checkout.',
          'A database migration cannot complete cleanly in production.',
          'Data integrity checks fail after schema changes.',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ul>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Compatibility notes</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Component', 'Minimum version'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Python runtime', '3.10'],
              ['PostgreSQL', '14'],
              ['Node.js (web-ui)', '18'],
              ['Alembic', '1.13'],
            ].map(([comp, ver]) => (
              <tr key={comp} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', color: 'var(--text)' }}>{comp}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{ver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
