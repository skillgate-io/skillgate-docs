import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PageWithTOC } from '@/components/ui/PageWithTOC';

export const metadata: Metadata = {
  title: 'VS Code Extension | SkillGate',
  description:
    'Catch risky changes in the editor before they become CI problems. Auto-activates on CLAUDE.md, hooks, and instruction files with inline diagnostics and real-time policy feedback.',
  keywords: [
    'SkillGate VS Code extension',
    'Claude Code VS Code security',
    'Codex VS Code policy',
    'CLAUDE.md linting VS Code',
    'AI agent hook security editor',
    'VS Code instruction file security',
    'inline policy diagnostics',
  ],
  openGraph: {
    title: 'VS Code Extension | SkillGate',
    description:
      'Catch risky hook and instruction file changes in the editor. Inline diagnostics, real-time policy feedback, no extra steps.',
    type: 'article',
  },
};

const TOC = [
  { id: 'where-it-turns-on', label: 'Where it turns on' },
  { id: 'how-setup-checks-work', label: 'How setup checks work' },
  { id: 'signed-report-proof', label: 'Signed report proof' },
  { id: 'team-setup-commands', label: 'Team setup' },
  { id: 'related-pages', label: 'Related pages' },
];

export default function VsCodeExtensionIntegrationPage() {
  return (
    <PageWithTOC items={TOC}>
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

        <h2 id="where-it-turns-on">Where it turns on</h2>
        <p>
          The extension activates automatically when you open files that control Claude Code and
          Codex behaviour. No configuration needed.
        </p>
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

        <h2 id="how-setup-checks-work">How setup checks work</h2>
        <p>
          On activation, the extension runs three checks. Commands that depend on the sidecar or
          your auth session stay gated until all three pass. Static diagnostics run regardless.
        </p>
        <CodeBlock
          language="text"
          code={`On activation:
1) Check SkillGate CLI availability
2) Check local auth session
3) Check sidecar health (127.0.0.1:9911)

Runtime commands are gated until ready.
Static diagnostics stay active even when the sidecar is unavailable.`}
        />

        <h2 id="team-setup-commands">Team setup</h2>
        <p>Publish the extension and bring up the sidecar for the first time.</p>
        <CodeBlock
          language="bash"
          code={`# Publish extension
cd vscode-extension
vsce publish

# Start the sidecar
skillgate auth login
python -m uvicorn skillgate.sidecar.app:create_sidecar_app \\
  --factory --host 127.0.0.1 --port 9911`}
        />

        <h2 id="signed-report-proof">Signed report proof</h2>
        <p>
          Quick visual proof of signed report generation and verification using{' '}
          <code>skillgate scan --sign</code> and <code>skillgate verify</code>.
        </p>
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: '10px',
            overflow: 'hidden',
            background: 'var(--sidebar-bg)',
            marginBottom: '18px',
          }}
        >
          <Image
            src="/media/demo/risky-signed-report-verification.gif"
            alt="Terminal walkthrough showing signed report scan and verification commands"
            width={1280}
            height={720}
            unoptimized
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <p style={{ marginTop: 0 }}>
          Prefer full playback?{' '}
          <a href="/media/demo/risky-signed-report-verification.mp4" target="_blank" rel="noreferrer" className="sg-link">
            Open the MP4 capture
          </a>.
        </p>

        <h2 id="related-pages">Related pages</h2>
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
    </PageWithTOC>
  );
}
