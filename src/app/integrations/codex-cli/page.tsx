import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Codex CLI Integration',
  description: 'Use SkillGate with Codex CLI and OpenClaw-connected local AI agents to block risky actions before execution.',
};

export default function CodexCLIIntegrationPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Integrations</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Codex CLI
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Run Codex through SkillGate to apply policy checks before commands execute.
        </p>
      </div>

      <h2>Quick start</h2>
      <CodeBlock
        language="bash"
        code={`# Local guarded run
skillgate codex --directory . exec "review this repository"

# CI hardened run
skillgate codex --ci --output sarif --directory . exec "run release checks"`}
      />

      <h2>Repo scope vs user scope</h2>
      <CodeBlock
        language="bash"
        code={`# Repo scope
skillgate codex --directory . exec "review this repository"

# User scope
skillgate codex --directory "$HOME" exec "list active projects"`}
      />

      <h2>Provider trust workflow</h2>
      <CodeBlock
        language="bash"
        code={`# Approve
skillgate codex approve filesystem --permissions fs.read,fs.write --directory .

# Revoke
skillgate codex revoke filesystem --directory .`}
      />

      <h2>Related pages</h2>
      <ul>
        <li><Link href="/cli/codex" className="sg-link">codex command reference</Link></li>
        <li><Link href="/agent-gateway" className="sg-link">Agent Gateway</Link></li>
      </ul>
    </div>
  );
}
