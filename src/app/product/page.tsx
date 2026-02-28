import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product',
  description: 'Product overview and capability model for SkillGate, the Agent Capability Firewall.',
};

const TIERS = [
  {
    name: 'Free',
    audience: 'Individual developers',
    items: [
      'Local skill bundle scans',
      'Basic findings across 7 languages',
      'Deterministic risk scoring',
      'Human, JSON, and SARIF output',
      'Ed25519 attestation (local keys)',
    ],
  },
  {
    name: 'Pro',
    audience: 'Individual power users',
    items: [
      'Everything in Free',
      'Policy enforcement (scan --enforce)',
      'Signed scan reports',
      'Explain mode and executive summaries',
      'Remote bundle scanning',
      'Multi-artifact support (PDF, DOCX, ZIP)',
    ],
  },
  {
    name: 'Team',
    audience: 'Engineering and security teams',
    items: [
      'Everything in Pro',
      'Runtime enforcement sidecar',
      'MCP gateway and Claude Code integration',
      'Codex CLI bridge',
      'VS Code extension',
      'Python SDK (PydanticAI, LangChain, CrewAI)',
      'Language shims (Go, Ruby, Rust, .NET, Java)',
      'GitHub Actions and GitLab CI integration',
      'Fleet scans and drift baselines',
      'Prometheus metrics and OTEL tracing',
      'Audit log with hash chain integrity',
      'SIEM webhooks (Datadog, Splunk, Elastic)',
      'Per-agent risk scoring and anomaly detection',
    ],
  },
  {
    name: 'Enterprise',
    audience: 'Security and platform teams',
    items: [
      'Everything in Team',
      'Multi-tenant workspace isolation',
      'RBAC (org admin, workspace admin, security reviewer, developer)',
      'Approval workflow with policy snapshot embedding',
      'Immutable policy versioning and rollback',
      'Community policy packs (signed, importable)',
      'NIST AI RMF and EU AI Act compliance annotations',
      'Governance report (PDF/Markdown)',
      'SAML 2.0 and OIDC SSO',
      'Streaming audit export (100k+ records)',
      'Custom policy, key namespaces, trust graph',
      'Private deployment and air-gap support',
    ],
  },
];

const PHASE2_MODULES = [
  ['Runtime sidecar', 'P95 enforcement decisions in under 20ms per tool invocation.'],
  ['MCP gateway', 'Intercepts Claude Code tool calls before they execute.'],
  ['Codex CLI bridge', 'Wraps Codex CLI with enforcement and CI guard mode.'],
  ['VS Code extension', 'Inline risk hints, hook editor, and simulation panel.'],
  ['Python SDK', 'One decorator for PydanticAI, LangChain, and CrewAI.'],
  ['Language shims', 'HTTP clients for Go, Ruby, Rust, .NET, Java, and TypeScript.'],
  ['Observability', 'Prometheus, OTEL, SIEM webhooks, and tamper-evident audit logs.'],
  ['Control plane', 'Multi-tenant workspaces, RBAC, approvals, and policy versioning.'],
];

export default function ProductPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Product</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Product
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          SkillGate is the Agent Capability Firewall, a runtime-embedded control plane that governs
          what AI agents do, not only what they say.
        </p>
      </div>

      <h2>Enforcement pipeline</h2>
      <div style={{ display: 'grid', gap: '10px', marginBottom: '28px', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
        {['Parse', 'Analyze', 'Score', 'Enforce', 'Record', 'Emit'].map((step, index) => (
          <div
            key={step}
            style={{
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '10px 12px',
              background: 'var(--sidebar-bg)',
              color: 'var(--text)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textAlign: 'center',
            }}
          >
            <span style={{ color: 'var(--text-muted)', marginRight: '6px' }}>{index + 1}.</span>
            {step}
          </div>
        ))}
      </div>

      <h2>Phase 2 modules</h2>
      <div style={{ display: 'grid', gap: '12px', marginBottom: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {PHASE2_MODULES.map(([title, desc]) => (
          <div key={title} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '14px' }}>
            <p style={{ margin: 0, color: 'var(--text)', fontWeight: 700, fontSize: '0.95rem' }}>{title}</p>
            <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>

      <h2>Capability by tier</h2>
      <div style={{ display: 'grid', gap: '16px', marginBottom: '28px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {TIERS.map((tier) => (
          <div key={tier.name} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
            <p style={{ margin: 0, color: 'var(--text)', fontWeight: 800, fontSize: '1rem' }}>{tier.name}</p>
            <p style={{ margin: '4px 0 10px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{tier.audience}</p>
            <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-muted)' }}>
              {tier.items.map((item) => (
                <li key={item} style={{ fontSize: '0.83rem', lineHeight: 1.9 }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
        Tier boundaries and availability can change before public release.
      </p>
    </div>
  );
}
