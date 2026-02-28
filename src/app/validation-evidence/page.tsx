import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Validation Evidence',
  description:
    'See real SkillGate validation evidence from official OpenClaw skills, Nanobot skills, and other public agent repositories with authenticated sidecar replay statistics.',
  alternates: { canonical: 'https://docs.skillgate.io/validation-evidence' },
  openGraph: {
    title: 'SkillGate Validation Evidence',
    description:
      'OpenClaw and Nanobot testbed results, corpus size metrics, and authenticated replay evidence for local AI agent security.',
    url: 'https://docs.skillgate.io/validation-evidence',
  },
};

const STATS = [
  { label: 'Total testbed corpus', value: '3,470 invocations' },
  { label: 'awesome-llm-apps corpus', value: '496 invocations' },
  { label: 'antigravity corpus', value: '2,856 invocations' },
  { label: 'openclaw corpus', value: '106 invocations' },
  { label: 'nanobot corpus', value: '12 invocations' },
  { label: 'Authenticated sidecar replay', value: '1,735 baseline invocations' },
];

const REPOS = [
  { name: 'shubhamsaboo/awesome-llm-apps', href: 'https://github.com/shubhamsaboo/awesome-llm-apps' },
  { name: 'sickn33/antigravity-awesome-skills', href: 'https://github.com/sickn33/antigravity-awesome-skills' },
  { name: 'openclaw/openclaw', href: 'https://github.com/openclaw/openclaw' },
  { name: 'HKUDS/nanobot', href: 'https://github.com/HKUDS/nanobot' },
];

export default function ValidationEvidencePage() {
  return (
    <div style={{ maxWidth: '820px' }} className="sg-prose">
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Validation
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Validation Evidence
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          This page shows direct evidence from real-world testbeds. SkillGate replayed capability corpora derived from public agent repositories, then enforced decisions through authenticated sidecar requests.
        </p>
      </div>

      <div
        style={{
          border: '1px solid var(--border)',
          borderRadius: '10px',
          background: 'var(--sidebar-bg)',
          padding: '16px',
          marginBottom: '20px',
        }}
      >
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Source repositories</div>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {REPOS.map((repo) => (
            <li key={repo.href} style={{ marginBottom: '8px' }}>
              <a href={repo.href} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '20px' }}>
        {STATS.map((item) => (
          <div
            key={item.label}
            style={{
              border: '1px solid var(--border)',
              borderRadius: '10px',
              background: 'var(--sidebar-bg)',
              padding: '12px',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {item.label}
            </div>
            <div style={{ marginTop: '6px', color: 'var(--text)', fontWeight: 700 }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', marginBottom: '12px' }}>
        <Image
          src="/images/validation-evidence/awesome-proof-card.svg"
          alt="SkillGate testbed evidence for awesome-llm-apps replay"
          width={1280}
          height={720}
          style={{ width: '100%', height: 'auto', border: '1px solid var(--border)', borderRadius: '10px' }}
        />
        <Image
          src="/images/validation-evidence/antigravity-proof-card.svg"
          alt="SkillGate testbed evidence for antigravity-awesome-skills replay"
          width={1280}
          height={720}
          style={{ width: '100%', height: 'auto', border: '1px solid var(--border)', borderRadius: '10px' }}
        />
        <Image
          src="/images/validation-evidence/openclaw-proof-card.svg"
          alt="SkillGate testbed evidence for openclaw skills replay"
          width={1280}
          height={720}
          style={{ width: '100%', height: 'auto', border: '1px solid var(--border)', borderRadius: '10px' }}
        />
        <Image
          src="/images/validation-evidence/nanobot-proof-card.svg"
          alt="SkillGate testbed evidence for nanobot skills replay"
          width={1280}
          height={720}
          style={{ width: '100%', height: 'auto', border: '1px solid var(--border)', borderRadius: '10px' }}
        />
      </div>

      <Image
        src="/images/validation-evidence/testbed-corpus-comparison.svg"
        alt="SkillGate testbed corpus size comparison"
        width={1280}
        height={720}
        style={{ width: '100%', height: 'auto', border: '1px solid var(--border)', borderRadius: '10px', marginBottom: '20px' }}
      />

      <div
        style={{
          border: '1px solid var(--border)',
          borderRadius: '10px',
          background: 'var(--sidebar-bg)',
          padding: '16px',
          marginBottom: '20px',
        }}
      >
        <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
          Signed report verification demo
        </div>
        <p style={{ color: 'var(--text-muted)', marginTop: 0, marginBottom: '12px', lineHeight: 1.7 }}>
          Real terminal capture showing a signed report workflow with <code>skillgate scan --sign</code> and{' '}
          <code>skillgate verify</code>.
        </p>
        <video
          controls
          preload="none"
          playsInline
          poster="/images/validation-evidence/openclaw-proof-card.svg"
          style={{
            width: '100%',
            height: 'auto',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            background: '#000',
          }}
        >
          <source src="/media/demo/risky-signed-report-verification.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
        <div style={{ marginTop: '10px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="/media/demo/risky-signed-report-verification.mp4"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--accent)' }}
          >
            Open MP4
          </a>
        </div>
      </div>

      <div
        style={{
          border: '1px solid var(--border)',
          borderRadius: '10px',
          background: 'var(--sidebar-bg)',
          padding: '16px',
          marginBottom: '20px',
        }}
      >
        <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>What this means for your team</div>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
          <li>Security claims are tied to reproducible evidence artifacts.</li>
          <li>Replay data uses authenticated sidecar policy paths, not mock-only checks.</li>
          <li>You can map these numbers to your own OpenClaw, Claude Code, Codex, and MCP rollout plan.</li>
          <li>ClawHub-related workflow coverage is represented through the public Nanobot skill corpus, not direct site scraping.</li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
        <Link
          href="/quickstart"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--accent)',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Start Quickstart
        </Link>
        <Link
          href="/integrations"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            textDecoration: 'none',
            fontWeight: 600,
            background: 'var(--sidebar-bg)',
          }}
        >
          View Integrations
        </Link>
      </div>
    </div>
  );
}
