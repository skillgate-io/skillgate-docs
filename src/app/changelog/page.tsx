import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Release updates focused on user-facing security, reliability, and workflow improvements.',
};

const RELEASES = [
  {
    label: 'February 2026: Control Plane + Compliance',
    date: '2026-02-28',
    summary: 'Multi-tenant workspace governance, RBAC, and compliance annotations for enterprise teams.',
    changes: [
      'Launched SaaS control plane with isolated workspaces and zero cross-tenant data access.',
      'Added four-role RBAC model (org admin, workspace admin, security reviewer, developer) with JWT group mapping.',
      'Added approval workflow with full lifecycle: request, approve/deny, and automatic policy snapshot embedding.',
      'Added immutable policy versioning with rollback to any prior version.',
      'Published five signed community policy packs importable with signature verification.',
      'Added NIST AI RMF (GOVERN, MAP, MEASURE, MANAGE) and EU AI Act (Articles 9, 10, 15, 17) annotations to all audit records.',
      'Added governance report generation covering capability inventory, anomaly timeline, and compliance annotation counts.',
      'Added SAML 2.0 and OIDC SSO with role mapping from identity provider groups.',
    ],
  },
  {
    label: 'February 2026: Observability + SIEM',
    date: '2026-02-27',
    summary: 'Full enforcement visibility via Prometheus, OpenTelemetry, and SIEM webhook exports.',
    changes: [
      'Added five Prometheus metrics covering decision outcomes, latency histogram, budget exhaustion, circuit state, and license mode.',
      'Added OpenTelemetry tracing with per-stage spans and W3C traceparent context propagation.',
      'Added append-only NDJSON audit log with rolling SHA-256 hash chain so any tampering is detectable.',
      'Added PII redaction modes (full, redacted, metadata-only) configurable per workspace.',
      'Launched SIEM connectors for Datadog Events API, Splunk HEC, and Elasticsearch Bulk API.',
      'Added HMAC-SHA256 signed webhook delivery for decision.deny, budget.exceeded, and anomaly.detected events.',
      'Added per-agent risk scoring (0-100) with 30-day rolling window and contributing factor breakdown.',
      'Added three anomaly types: spike detection, new capability detection, and suspicious capability combination.',
      'Added skillgate export command supporting CSV, JSON, SARIF, and SIEM-native formats with streaming for large datasets.',
    ],
  },
  {
    label: 'February 2026: Multi-language Shims + SDK Ecosystem',
    date: '2026-02-26',
    summary: 'Sidecar enforcement clients for Go, Ruby, Rust, .NET, Java, and TypeScript.',
    changes: [
      'Published six language shims (Go, Ruby, Rust, .NET/C#, Java, TypeScript) as open-source CE packages.',
      'Each shim wraps POST /v1/decide with typed ToolInvocation and DecisionRecord models.',
      'Added integration manifest spec v1 (YAML) so tool registrations are machine-readable and auditable.',
      'SDK now auto-registers AI-BOM on first call and updates it on package version change.',
      'Added skillgate integrate --framework auto-detection that generates framework-specific example code.',
      'Published skillgate-sdk[pydantic-ai], [langchain], and [crewai] extras to PyPI.',
    ],
  },
  {
    label: 'February 2026: Codex and MCP Workflow Safety',
    date: '2026-02-25',
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
