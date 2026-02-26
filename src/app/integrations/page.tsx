import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { IntegrationLogos } from '@/components/branding/IntegrationLogos';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Integrate SkillGate with OpenClaw, Codex CLI, Claude Code, MCP Gateway, GitHub Actions, and GitLab CI. Review real validation evidence and corpus-level security replay stats.',
};

const INTEGRATIONS = [
  {
    href: '/integrations/codex-cli',
    title: 'Codex CLI',
    desc: 'Run Codex with pre-execution safety checks, trusted providers, and CI-ready defaults.',
    status: 'Available',
  },
  {
    href: '/integrations/claude-code',
    title: 'Claude Code',
    desc: 'Protect Claude hooks, settings, plugins, and instruction files with policy controls.',
    status: 'Available',
  },
  {
    href: '/integrations/mcp-gateway',
    title: 'MCP Gateway',
    desc: 'Approve trusted MCP providers and block unsafe metadata or permission expansion.',
    status: 'Available',
  },
  {
    href: '/integrations/github-actions',
    title: 'GitHub Actions',
    desc: 'Gate your CI pipeline with a single workflow step. Uploads SARIF results to the GitHub Security tab.',
    status: 'Available',
  },
  {
    href: '/integrations/gitlab-ci',
    title: 'GitLab CI',
    desc: 'Add SkillGate to your .gitlab-ci.yml pipeline with a ready-made include template.',
    status: 'Available',
  },
];

export default function IntegrationsPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Integrations</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Integrations
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          SkillGate integrates with runtime agent ecosystems and CI platforms. Choose an integration guide based on your stack, including OpenClaw and other local AI agents.
        </p>
      </div>
      <IntegrationLogos />

      <div
        style={{
          border: '1px solid var(--border)',
          borderRadius: '10px',
          background: 'var(--sidebar-bg)',
          padding: '16px',
          marginBottom: '20px',
        }}
      >
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Validation evidence</div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
          Tested on real public agent repositories
        </h2>
        <p style={{ marginTop: '8px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          SkillGate replayed 3,352 testbed invocations from real public agent ecosystems with authenticated sidecar enforcement. Use this evidence page to review corpus size, replay outcomes, and proof visuals.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '10px',
            marginTop: '12px',
          }}
        >
          <Image
            src="/images/validation-evidence/awesome-proof-card.svg"
            alt="SkillGate testbed proof for awesome-llm-apps"
            width={1280}
            height={720}
            style={{ width: '100%', height: 'auto', border: '1px solid var(--border)', borderRadius: '8px' }}
          />
          <Image
            src="/images/validation-evidence/antigravity-proof-card.svg"
            alt="SkillGate testbed proof for antigravity-awesome-skills"
            width={1280}
            height={720}
            style={{ width: '100%', height: 'auto', border: '1px solid var(--border)', borderRadius: '8px' }}
          />
        </div>
        <Link
          href="/validation-evidence"
          style={{
            display: 'inline-flex',
            marginTop: '12px',
            padding: '8px 12px',
            borderRadius: '8px',
            background: 'var(--accent)',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Open Validation Evidence
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
        {INTEGRATIONS.map((integ) => (
          <Link
            key={integ.href}
            href={integ.href}
            style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: '16px', padding: '20px 24px',
              borderRadius: '10px', border: '1px solid var(--border)',
              background: 'var(--sidebar-bg)', textDecoration: 'none',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text)', marginBottom: '4px' }}>{integ.title}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{integ.desc}</div>
            </div>
            <span style={{
              fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px',
              borderRadius: '4px', background: 'var(--callout-tip-bg)',
              color: '#16a34a', border: '1px solid var(--callout-tip-border)',
              whiteSpace: 'nowrap', alignSelf: 'flex-start',
            }}>{integ.status}</span>
          </Link>
        ))}
      </div>

      <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--sidebar-bg)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
        <strong style={{ color: 'var(--text)' }}>Other platforms:</strong> SkillGate works anywhere you can run a shell command.
        Use <code>skillgate scan --enforce --quiet</code> and check the exit code.
        Exit 0 means pass; exit 1 means violation.
      </div>
    </div>
  );
}
