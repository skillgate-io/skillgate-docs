import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Product update log for SkillGate documentation and rollout status.',
};

const RELEASES = [
  {
    label: 'Pre-launch status',
    date: '2026-02-23',
    summary: 'Public launch is in progress. GA versioning is not announced yet.',
    changes: [
      'Docs migrated to docs.skillgate.io.',
      'Core guides published for setup, policy, rules, and integrations.',
      'Enterprise and legal guidance pages prepared for buyer review.',
      'Content cleanup in progress to keep docs user-focused and launch-accurate.',
    ],
  },
  {
    label: 'What to expect next',
    date: 'Planned',
    summary: 'These updates are planned for public launch readiness.',
    changes: [
      'Versioned public release notes after GA announcement.',
      'Endpoint-level API reference by tier.',
      'Expanded operational runbooks for self-hosted teams.',
      'Additional migration guides for upgrade paths.',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>More</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Changelog
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Launch-status updates for SkillGate docs and rollout readiness.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {RELEASES.map((release) => (
          <div key={release.label} style={{ borderLeft: '2px solid var(--border)', paddingLeft: '24px', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: '-5px', top: '4px',
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--accent)', border: '2px solid var(--bg)',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)', fontFamily: 'monospace' }}>
                {release.label}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{release.date}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px', fontStyle: 'italic' }}>
              {release.summary}
            </p>
            <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
              {release.changes.map((change) => (
                <li key={change} style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 2, marginBottom: '2px' }}>
                  {change}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
