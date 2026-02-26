import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'codex - CLI Reference',
  description: 'Codex command for safer execution with policy checks, trusted providers, and CI-ready defaults.',
};

export default function CodexPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>codex</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Run Codex through SkillGate to block risky actions, catch unsafe configuration changes, and keep provider trust under control.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate codex [--ci] [--output json|sarif] <codex-args>`} />

      <h2>Core usage</h2>
      <CodeBlock
        language="bash"
        code={`# Standard guarded execution
skillgate codex --directory . exec "review this repository"

# Hardened CI mode
skillgate codex --ci --output sarif --directory . exec "run release checks"`}
      />

      <h2>Repo scope vs user scope</h2>
      <CodeBlock
        language="bash"
        code={`# Repo scope: enforce only this repository
skillgate codex --directory . exec "review changed files"

# User scope: enforce from your home workspace context
skillgate codex --directory "$HOME" exec "list active projects"`}
      />

      <h2>Provider approval workflow</h2>
      <CodeBlock
        language="bash"
        code={`# Approve a provider and allowed permission set
skillgate codex approve filesystem --permissions fs.read,fs.write --directory .

# Revoke provider access
skillgate codex revoke filesystem --directory .`}
      />

      <h2>What gets checked before execution</h2>
      <ul>
        <li>Instruction file injection detection for AGENTS.md, codex.md, and .codex/instructions.md.</li>
        <li>Config poisoning detection in <code>codex.yml</code>, <code>.codex/*</code>, <code>mcp.json</code>, and <code>.mcp/**</code>.</li>
        <li>Supply-chain checksum drift checks from <code>.skillgate/aibom.lock</code>.</li>
        <li>Permission expansion checks for <code>allowedCommands</code>, <code>trustedProviders</code>, and <code>shellAccess</code>.</li>
      </ul>

      <h2>Common block reasons</h2>
      <ul>
        <li><code>SG_DENY_CONFIG_POISONING_DETECTED</code></li>
        <li><code>SG_DENY_INSTRUCTION_FILE_INJECTION</code></li>
        <li><code>SG_DENY_SETTINGS_PERMISSION_EXPANSION</code></li>
        <li><code>SG_DENY_UNTRUSTED_TOOL_PROVIDER</code></li>
      </ul>
    </div>
  );
}
