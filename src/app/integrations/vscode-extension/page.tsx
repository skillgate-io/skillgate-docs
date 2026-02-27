import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'VS Code Extension Integration',
  description:
    'SkillGate VS Code extension guide for teams who want clear, early security feedback in Claude Code and Codex workspaces.',
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
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '2rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            margin: 0,
          }}
        >
          <Image
            src="/images/integrations/vscode.svg"
            alt="VS Code logo"
            width={32}
            height={32}
            style={{ height: '32px', width: '32px', objectFit: 'contain' }}
          />
          VS Code Extension
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Catch risky changes in the editor before they become runtime or CI problems.
        </p>
      </div>

      <h2>Where it turns on</h2>
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

      <h2>How setup checks work</h2>
      <CodeBlock
        language="text"
        code={`On activation:
1) Check SkillGate CLI availability
2) Check local auth session
3) Check sidecar health (127.0.0.1:9911)

Runtime/auth-dependent commands are gated until ready.
Static diagnostics stay active even when runtime is unavailable.`}
      />

      <h2>Team setup commands</h2>
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
