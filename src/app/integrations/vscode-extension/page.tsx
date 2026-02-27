import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'VS Code Extension Integration',
  description:
    'SkillGate VS Code extension guide for enterprise shift-left agent security, preflight onboarding, and runtime-aware controls for Claude Code and Codex workspaces.',
};

export default function VsCodeExtensionIntegrationPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Integrations
        </div>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            margin: 0,
          }}
        >
          VS Code Extension
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Shift-left workspace governance for Claude Code and Codex projects with setup-aware runtime controls.
        </p>
      </div>

      <div
        style={{
          border: '1px solid var(--border)',
          borderRadius: '10px',
          background: 'var(--sidebar-bg)',
          padding: '16px',
          marginBottom: '24px',
        }}
      >
        <Image
          src="/images/integrations/skillgate-vscode.svg"
          alt="SkillGate VS Code extension logo"
          width={72}
          height={72}
          style={{ height: '56px', width: '56px', objectFit: 'contain' }}
        />
        <p style={{ margin: '10px 0 0', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Uses the same production logo and control-plane model as{' '}
          <a href="https://skillgate.io" className="sg-link">
            skillgate.io
          </a>{' '}
          and{' '}
          <a href="https://docs.skillgate.io" className="sg-link">
            docs.skillgate.io
          </a>
          .
        </p>
      </div>

      <h2>Activation and coverage</h2>
      <CodeBlock
        language="text"
        code={`Auto-activates on:
- CLAUDE.md
- AGENTS.md
- MEMORY.md
- .claude/hooks/**
- .claude/commands/**
- .claude/instructions.md
- .claude/memory/**`}
      />

      <h2>Preflight and onboarding flow</h2>
      <CodeBlock
        language="text"
        code={`On activation:
1) Check SkillGate CLI availability
2) Check local auth session
3) Check sidecar health (127.0.0.1:9911)

Runtime/auth-dependent commands are gated until ready.
Static diagnostics stay active even when runtime is unavailable.`}
      />

      <h2>Enterprise rollout commands</h2>
      <CodeBlock
        language="bash"
        code={`# Publish extension
cd vscode-extension
vsce publish

# Developer bootstrap
skillgate auth login
python -m uvicorn skillgate.sidecar.app:create_sidecar_app --factory --host 127.0.0.1 --port 9911`}
      />

      <h2>Related pages</h2>
      <ul>
        <li>
          <Link href="/integrations/python-sdk" className="sg-link">
            Python SDK integration
          </Link>
        </li>
        <li>
          <Link href="/integrations/claude-code" className="sg-link">
            Claude Code integration
          </Link>
        </li>
        <li>
          <Link href="/runtime-control" className="sg-link">
            Runtime Control
          </Link>
        </li>
      </ul>
    </div>
  );
}
