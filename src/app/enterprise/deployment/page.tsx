import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise Deployment',
  description: 'Deployment models and rollout guidance for enterprise SkillGate usage.',
};

export default function EnterpriseDeploymentPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Enterprise</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Enterprise Deployment
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Choose the deployment mode that fits your network constraints and control requirements.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Deployment modes</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Mode', 'Network', 'Use case'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['SaaS', 'Outbound allowed', 'Teams with standard CI that can reach api.skillgate.io.'],
              ['Private relay', 'Internal proxy', 'Restricted networks. Policy authority stays inside your perimeter.'],
              ['Air-gap', 'None required', 'Offline entitlement packs with configurable expiry windows.'],
              ['Local', 'None required', 'Developer workstations and local evaluation.'],
            ].map(([mode, network, use]) => (
              <tr key={mode} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontWeight: 500, color: 'var(--text)' }}>{mode}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{network}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Rollout sequence</h2>
      <ol style={{ color: 'var(--text-muted)', lineHeight: 2.4, paddingLeft: '24px', marginBottom: '32px' }}>
        {[
          'Pilot in one repository and one CI lane with scan-only mode (no enforcement).',
          'Enable policy enforcement and confirm exit code behavior with the team.',
          'Introduce runtime gateway wrapping in the pilot repository.',
          'Enable artifact verification and approval gates for promotion paths.',
          'Expand to all critical repositories and all deployment lanes.',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ol>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Environment variable reference</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Variable', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['SKILLGATE_API_KEY', 'Required for entitlement-resolved commands.'],
              ['SKILLGATE_API_URL', 'Override the hosted API endpoint (private relay).'],
              ['SKILLGATE_BUDGET_SHELL', 'Maximum shell executions allowed per session.'],
              ['SKILLGATE_BUDGET_NETWORK', 'Maximum network calls allowed per session.'],
              ['SKILLGATE_BUDGET_FILESYSTEM', 'Maximum filesystem writes allowed per session.'],
            ].map(([v, desc]) => (
              <tr key={v} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{v}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
