import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SkillGate Docs',
  description:
    'SkillGate scans AI agent skills for security risks and enforces policy gates before deployment.',
};

const FEATURES = [
  {
    icon: '🔍',
    title: '119 Detection Rules',
    desc: 'Static analysis across Python, JavaScript, TypeScript, Shell, Go, Rust, and Ruby. No ML — deterministic results every time.',
  },
  {
    icon: '⚡',
    title: 'Fast by Default',
    desc: 'Cold start under 2 seconds. Scans 10 files in under 3 seconds. Zero network calls during local analysis.',
  },
  {
    icon: '🔐',
    title: 'Signed Attestations',
    desc: 'Ed25519-signed scan reports with canonical JSON hashing. Verifiable proof of policy compliance.',
  },
  {
    icon: '🚦',
    title: 'Policy Presets',
    desc: 'Ship with development, staging, production, and strict presets. Override with a single YAML file.',
  },
  {
    icon: '🔗',
    title: 'CI/CD Native',
    desc: 'First-class GitHub Actions and GitLab CI support. SARIF output for the GitHub Security tab.',
  },
  {
    icon: '📦',
    title: 'Multi-Artifact',
    desc: 'Scans ZIP bundles, PDF documents, DOCX files, and source directories with cross-artifact correlation.',
  },
];

const QUICK_LINKS = [
  { href: '/quickstart', label: 'Quickstart', desc: 'Scan your first skill in 5 minutes.' },
  { href: '/installation', label: 'Installation', desc: 'All install channels: pipx, pip, brew, winget.' },
  { href: '/cli/scan', label: 'scan command', desc: 'Full reference for flags, output formats, and examples.' },
  { href: '/rules', label: 'Rule Catalog', desc: '119 rules across 7 languages and 7 categories.' },
  { href: '/policy', label: 'Policy Reference', desc: 'Schema, presets, and enforcement behavior.' },
  { href: '/integrations/github-actions', label: 'GitHub Actions', desc: 'Gate CI pipelines with one workflow step.' },
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
            v1.0 — 1,245 tests passing
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
            maxWidth: '600px',
            margin: 0,
          }}
        >
          SkillGate is a CLI-first security scanner and policy enforcement tool for AI agent skills.
          It blocks unsafe code before deployment using deterministic static analysis and signed attestations.
        </p>
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
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
          gap: '16px',
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
