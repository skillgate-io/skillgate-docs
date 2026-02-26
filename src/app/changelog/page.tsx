import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Release updates focused on user-facing security, reliability, and workflow improvements.',
};

const RELEASES = [
  {
    label: 'February 2026: Codex and MCP Workflow Safety',
    date: '2026-02-26',
    summary: 'Safer day-to-day workflows for teams running Codex and MCP-backed tools.',
    changes: [
      'Added stronger pre-run checks to catch risky local config changes before execution.',
      'Expanded trust controls so teams can approve and revoke providers with confidence.',
      'Improved CI defaults so unknown providers are blocked unless explicitly approved.',
      'Added clearer denial reasons to speed up remediation and reduce repeated failures.',
    ],
  },
  {
    label: 'February 2026: Claude and Tooling Protections',
    date: '2026-02-25',
    summary: 'More complete safeguards for Claude workflows and connected tool ecosystems.',
    changes: [
      'Expanded instruction-injection detection across common Claude workspace files.',
      'Added stronger checks for MCP provider metadata before tool exposure.',
      'Improved change detection when tool permissions expand beyond approved scope.',
      'Improved audit visibility for teams reviewing runtime security events.',
    ],
  },
  {
    label: 'February 2026: Access and Reliability Improvements',
    date: '2026-02-24',
    summary: 'More reliable protections across online and limited-connectivity environments.',
    changes: [
      'Improved session validation for consistent policy checks across environments.',
      'Added safer fallback behavior when connectivity is unavailable.',
      'Improved entitlement handling to match the active account plan.',
      'Improved license refresh behavior to reduce workflow interruptions.',
    ],
  },
  {
    label: 'February 2026: Runtime Protection Foundation',
    date: '2026-02-23',
    summary: 'Core runtime protections now available for teams that need pre-execution control.',
    changes: [
      'Added pre-execution policy checks for high-risk tool actions.',
      'Added rate and budget controls to prevent risky command bursts.',
      'Added signed runtime records for stronger audit confidence.',
      'Improved performance monitoring to keep enforcement overhead low.',
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
          Product updates focused on safer agent workflows, stronger trust controls, and better operator clarity.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {RELEASES.map((release) => (
          <div key={release.label} style={{ borderLeft: '2px solid var(--border)', paddingLeft: '24px', position: 'relative' }}>
            <div
              style={{
                position: 'absolute', left: '-5px', top: '4px',
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--accent)', border: '2px solid var(--bg)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)', fontFamily: 'monospace' }}>
                {release.label}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{release.date}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
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
