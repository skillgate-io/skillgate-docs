import type { Metadata } from 'next';
import Link from 'next/link';
import { IntegrationLogos } from '@/components/branding/IntegrationLogos';

export const metadata: Metadata = {
  title: 'SkillGate Docs: Runtime Security for OpenClaw, Claude, and Codex',
  description:
    'Protect OpenClaw gateways and local agent runtimes from unsafe tool actions, malicious instructions, and untrusted providers.',
  alternates: { canonical: 'https://docs.skillgate.io' },
  openGraph: {
    title: 'SkillGate Docs: Runtime Security for OpenClaw, Claude, and Codex',
    description:
      'Stop compromised skills before tools execute with policy checks for OpenClaw, Claude Code, Codex CLI, and MCP.',
    url: 'https://docs.skillgate.io',
  },
};

const FEATURES = [
  {
    icon: '🛡️',
    title: 'Block Risky Tool Actions',
    desc: 'Check shell, network, and file operations before execution so unsafe actions are stopped early.',
  },
  {
    icon: '🔐',
    title: 'Reliable Access Controls',
    desc: 'Keep protections active with secure session checks and safe behavior during connectivity issues.',
  },
  {
    icon: '🔌',
    title: 'MCP Protection Layer',
    desc: 'Approve trusted MCP providers, catch risky tool descriptions, and prevent surprise permission changes.',
  },
  {
    icon: '📄',
    title: 'Instruction Safety',
    desc: 'Detect prompt and instruction injection in AGENTS.md, CLAUDE.md, slash commands, and memory files.',
  },
  {
    icon: '⚙️',
    title: 'Safer Codex Sessions',
    desc: 'Run Codex with policy checks that prevent unsafe config changes and untrusted provider use.',
  },
  {
    icon: '🧾',
    title: 'Signed Evidence and SARIF',
    desc: 'Export machine-readable proofs for CI gates, audit trails, and security tooling workflows.',
  },
];

const QUICK_LINKS = [
  { href: '/use-cases', label: 'Use Cases', desc: 'Task-first guides for OpenClaw, Claude Code, Codex CLI, MCP, and CI pipelines.' },
  { href: '/use-cases/openclaw-gateway', label: 'Protect OpenClaw Gateway', desc: 'Apply runtime checks before local agent tools execute.' },
  { href: '/integrations/vscode-extension', label: 'VS Code Extension', desc: 'Shift-left editor diagnostics with setup preflight and status panel.' },
  { href: '/integrations/python-sdk', label: 'Python SDK', desc: 'Decorator-based runtime sidecar enforcement for production Python tools.' },
  { href: '/use-cases/codex-cli', label: 'Protect Codex CLI', desc: 'Guard Codex sessions with CI-safe defaults and trust controls.' },
  { href: '/use-cases/claude-code', label: 'Protect Claude Code', desc: 'Protect hooks, plugins, settings, and instruction files.' },
  { href: '/quickstart', label: 'Quickstart', desc: 'Scan your first skill in 5 minutes.' },
  { href: '/validation-evidence', label: 'Validation Evidence', desc: 'See proof images and real replay stats from public agent testbeds.' },
  { href: '/installation', label: 'Installation', desc: 'All install channels: pipx, pip, brew, and winget.' },
  { href: '/runtime-control', label: 'Runtime Control', desc: 'Learn how runtime checks, approvals, and policy outcomes work.' },
  { href: '/agent-gateway', label: 'Agent Gateway', desc: 'Protect Claude and Codex workflows with pre-execution policy checks.' },
  { href: '/cli/scan', label: 'scan command', desc: 'Full reference for flags, output formats, and examples.' },
  { href: '/rules', label: 'Rule Catalog', desc: '119 rules across 7 languages and 7 categories.' },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: '860px' }}>
      {/* Hero */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ marginBottom: '12px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '3px 10px',
              borderRadius: '20px',
              background: 'var(--nav-active-bg)',
              color: 'var(--accent)',
              fontSize: '0.75rem',
              fontWeight: 600,
              border: '1px solid var(--nav-active-border)',
              letterSpacing: '0.03em',
            }}
          >
            v1.0
          </span>
        </div>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            lineHeight: 1.1,
            margin: '0 0 16px',
          }}
        >
          SkillGate Docs
        </h1>
        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: '620px',
            margin: 0,
          }}
        >
          SkillGate is the runtime control plane for teams securing local AI gateways and agent tools.
          Protect your{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>OpenClaw gateway</strong>,{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>MCP servers</strong>,{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Claude Code hooks</strong>, and{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Codex CLI sessions</strong> before risky tools execute.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
          {['OpenClaw', 'Claude Code', 'Codex CLI', 'MCP Gateway'].map((item) => (
            <span
              key={item}
              style={{
                fontSize: '0.78rem',
                padding: '4px 12px',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                background: 'var(--sidebar-bg)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <div
          style={{
            marginTop: '14px',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
          }}
        >
          Evidence-backed rollout: 3,352 testbed invocations replayed from public agent repositories with authenticated sidecar enforcement.
          <Link href="/validation-evidence" style={{ marginLeft: '8px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            View evidence
          </Link>
        </div>
      </div>

      {/* Quick start banner */}
      <div
        style={{
          background: 'var(--sidebar-bg)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontWeight: 600, marginBottom: '4px', color: 'var(--text)' }}>Get started in seconds</div>
          <code style={{ fontSize: '0.875rem', color: 'var(--accent)', fontFamily: 'monospace' }}>
            pipx install skillgate
          </code>
        </div>
        <Link
          href="/quickstart"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 18px',
            borderRadius: '8px',
            background: 'var(--accent)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Quickstart guide
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
      <IntegrationLogos />

      {/* Quick links grid */}
      <h2
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '16px',
        }}
      >
        Jump to
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '12px',
          marginBottom: '48px',
        }}
      >
        {QUICK_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="card-link">
            <div
              style={{
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--accent)',
                marginBottom: '4px',
              }}
            >
              {link.label}
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{link.desc}</div>
          </Link>
        ))}
      </div>

      <h2
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '16px',
        }}
      >
        Protection map
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '12px',
          marginBottom: '48px',
        }}
      >
        {[
          { href: '/runtime-control', label: 'Runtime Sidecar Controls', desc: 'Policy checks before shell, network, and file actions run.' },
          { href: '/agent-gateway', label: 'Agent Gateway Wrapper', desc: 'Guard OpenClaw and other local AI agents through skillgate run.' },
          { href: '/integrations/codex-cli', label: 'Codex CLI Protection', desc: 'Config safety checks and provider trust controls.' },
          { href: '/integrations/claude-code', label: 'Claude Code Protection', desc: 'Hooks, instruction files, plugins, and settings controls.' },
          { href: '/integrations/vscode-extension', label: 'VS Code Extension Protection', desc: 'Editor setup checks and diagnostics before runtime and CI execution.' },
          { href: '/integrations/python-sdk', label: 'Python SDK Protection', desc: 'Protect app tool calls before execution with clear policy outcomes.' },
          { href: '/integrations/mcp-gateway', label: 'MCP Gateway Protection', desc: 'Trusted provider allowlists and metadata safety checks.' },
          { href: '/operations', label: 'Operator Runbook', desc: 'Incident triage, remediations, and performance guardrails.' },
        ].map((link) => (
          <Link key={link.href} href={link.href} className="card-link">
            <div
              style={{
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--accent)',
                marginBottom: '4px',
              }}
            >
              {link.label}
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{link.desc}</div>
          </Link>
        ))}
      </div>

      {/* Target use cases for SEO discovery */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          background: 'var(--sidebar-bg)',
          marginBottom: '48px',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            marginBottom: '12px',
          }}
        >
          Protects
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            'OpenClaw gateways',
          'MCP servers',
          'Claude Code workspaces',
          'Codex CLI workflows',
          'Agent orchestration pipelines',
            'LangChain agents',
            'AutoGen workflows',
            'Custom skill registries',
            'CI/CD skill deployments',
            'Local AI dev environments',
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.8rem',
                padding: '4px 12px',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                background: 'var(--bg)',
                whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <h2
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '16px',
        }}
      >
        What teams use SkillGate for
      </h2>
      <div style={{ marginBottom: '48px', border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--sidebar-bg)', padding: '18px 20px' }}>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: 1.9 }}>
          <li>Protect local AI tools without slowing down developers.</li>
          <li>Approve trusted providers and block unknown or changed integrations.</li>
          <li>Prevent instruction injection across agent config and prompt files.</li>
          <li>Produce clear evidence for incident response and compliance teams.</li>
        </ul>
      </div>

      {/* Features grid */}
      <h2
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '16px',
        }}
      >
        What SkillGate does
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '12px',
        }}
      >
        {FEATURES.map((f) => (
          <div
            key={f.title}
            style={{
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'var(--sidebar-bg)',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{f.icon}</div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '6px', color: 'var(--text)' }}>
              {f.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
