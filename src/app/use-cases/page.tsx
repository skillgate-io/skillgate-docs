import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Use Cases',
  description:
    'Task-first guides to secure OpenClaw gateways, Claude Code, Codex CLI, MCP tool paths, and CI pipelines with SkillGate.',
};

const CASES = [
  {
    href: '/use-cases/openclaw-gateway',
    title: 'Protect OpenClaw Gateway',
    desc: 'Apply runtime policy checks before tool execution on local OpenClaw workflows.',
  },
  {
    href: '/use-cases/claude-code',
    title: 'Protect Claude Code',
    desc: 'Protect hooks, settings, plugins, and instruction files before risky actions run.',
  },
  {
    href: '/use-cases/codex-cli',
    title: 'Protect Codex CLI',
    desc: 'Run Codex with safer defaults, trusted providers, and CI guardrails.',
  },
  {
    href: '/use-cases/mcp-gateway',
    title: 'Protect MCP Gateway',
    desc: 'Approve trusted providers and prevent unsafe permission or metadata changes.',
  },
  {
    href: '/use-cases/ci-gating',
    title: 'Secure CI Gating',
    desc: 'Block risky pull request changes and keep release evidence tied to policy outcomes.',
  },
];

export default function UseCasesPage() {
  return (
    <div style={{ maxWidth: '780px' }} className="sg-prose">
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Use Cases</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Use Cases
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Start with your real workflow first, then map commands and integrations to that workflow.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {CASES.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              border: '1px solid var(--border)',
              borderRadius: '10px',
              background: 'var(--sidebar-bg)',
              padding: '14px',
              textDecoration: 'none',
            }}
          >
            <div style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: '6px' }}>{item.title}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</div>
          </Link>
        ))}
      </div>

      <h2 style={{ marginTop: '32px' }}>Command order by scenario</h2>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
        Use these sequences when your team asks what to run first, what to run next, and what to run before production rollout.
      </p>

      <h3 style={{ marginTop: '20px' }}>Scenario 1: first secure scan in a new repository</h3>
      <CodeBlock
        language="bash"
        code={`skillgate version
skillgate reputation init --store .skillgate/reputation/reputation.json
skillgate scan ./my-skill --reputation-store .skillgate/reputation/reputation.json
skillgate scan ./my-skill --enforce --policy production --reputation-store .skillgate/reputation/reputation.json`}
      />

      <h3 style={{ marginTop: '20px' }}>Scenario 2: CI policy gate with signed evidence</h3>
      <CodeBlock
        language="bash"
        code={`skillgate scan ./my-skill --enforce --policy production --output json --report-file /tmp/scan-report.json
skillgate verify /tmp/scan-report.json
skillgate submit-scan /tmp/scan-report.json`}
      />

      <h3 style={{ marginTop: '20px' }}>Scenario 3: runtime enforcement for agent commands</h3>
      <CodeBlock
        language="bash"
        code={`skillgate run --env ci --reputation-store .skillgate/reputation/reputation.json -- codex exec "review changed files"
skillgate run --env prod --approval-file .skillgate/approvals/approval.json --required-reviewers 2 --reputation-store .skillgate/reputation/reputation.json -- codex exec "deploy release"`}
      />
    </div>
  );
}
