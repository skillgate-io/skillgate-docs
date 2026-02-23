import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'SkillGate release history and version notes.',
};

const RELEASES = [
  {
    version: '1.0.0',
    date: '2026-02-23',
    status: 'stable' as const,
    summary: 'General availability release.',
    changes: [
      'Core scanning engine with 119 detection rules across 7 languages.',
      'Deterministic risk scoring with severity multipliers.',
      'Policy enforcement: development, staging, production, and strict presets.',
      'Ed25519 signed attestation reports.',
      'SARIF 2.1.0 output for GitHub Security tab.',
      'GitHub Actions and GitLab CI integration.',
      'Multi-artifact scanning: ZIP, PDF, DOCX, and source directories.',
      'Cross-artifact correlation for distributed skills.',
      'git pre-commit hooks via skillgate hooks install.',
      'Entitlement contract: Free (10/min), Pro (60/min), Team (300/min), Enterprise (1000/min).',
    ],
  },
  {
    version: '0.9.0',
    date: '2026-01-15',
    status: 'stable' as const,
    summary: 'Release candidate. API stabilization and performance improvements.',
    changes: [
      'Cold start under 2 seconds.',
      'Parallel rule evaluation per file.',
      'Unicode hardening (homoglyph detection, bidirectional override detection).',
      'Performance SLO guards: skip files over 100KB with warning.',
      'Retroscan: replay historical scans with updated rules.',
      'Hunt: search historical scan reports by rule ID and severity.',
      'Approval workflow signing (Enterprise).',
    ],
  },
  {
    version: '0.7.0',
    date: '2025-11-20',
    status: 'stable' as const,
    summary: 'Universal language governance across all 7 supported languages.',
    changes: [
      'Go, Rust, and Ruby rule coverage added.',
      'Per-origin policy for multi-skill bundles.',
      'Session lineage DAG for runtime tracing (Enterprise).',
      'AI-BOM (CycloneDX) import and validation.',
      'Reputation graph verification.',
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
          Release history for SkillGate.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {RELEASES.map((release) => (
          <div key={release.version} style={{ borderLeft: '2px solid var(--border)', paddingLeft: '24px', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: '-5px', top: '4px',
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--accent)', border: '2px solid var(--bg)',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)', fontFamily: 'monospace' }}>
                v{release.version}
              </span>
              <Badge status={release.status} />
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
