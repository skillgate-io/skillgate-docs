import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'claude - CLI Reference',
  description: 'Claude ecosystem governance commands for hooks, instructions, settings, plugins, and behavior drift.',
};

export default function ClaudePage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>claude</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Govern Claude Code attack surfaces including hooks, instruction files, plugin registries, settings drift, and lineage behavior.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate claude <subcommand> [options]`} />

      <h2>High-signal scan workflow</h2>
      <CodeBlock
        language="bash"
        code={`# Scan all configured surfaces
skillgate claude scan . --surface all --output sarif --ci

# Focus on instruction and hooks surfaces
skillgate claude scan . --surface instruction-files,hooks --ci`}
      />

      <h2>Repo scope vs user scope</h2>
      <CodeBlock
        language="bash"
        code={`# Repo scope: scan only the current project
skillgate claude scan --directory . --surface all --output json

# User scope: scan user-level Claude settings
skillgate claude scan --directory ~/.claude --surface settings,instruction-files --output json`}
      />

      <h2>Hook lifecycle</h2>
      <CodeBlock
        language="bash"
        code={`skillgate claude hooks list --directory .
skillgate claude hooks approve .claude/hooks/pre-tool-use.sh --directory .
skillgate claude hooks diff --directory .
skillgate claude hooks audit --directory . --limit 100`}
      />

      <h2>Plugin registry and settings</h2>
      <CodeBlock
        language="bash"
        code={`skillgate claude plugins list --directory .
skillgate claude plugins attest demo.plugin --checksum <sha256> --publisher skillgate --directory .
skillgate claude settings drift --directory . --ci`}
      />

      <h2>Subcommand groups</h2>
      <ul>
        <li><code>scan</code>: unified governance scan with SARIF or JSON output.</li>
        <li><code>hooks</code>: list, approve, diff, and audit hook files.</li>
        <li><code>plugins</code>: attest, block, trust-key, and sync plugin snapshots.</li>
        <li><code>settings</code>: detect permission expansion from baseline.</li>
        <li><code>behavior</code>: baseline and detect drift by actor and surface.</li>
        <li><code>agents</code>: lineage and risk score for sub-agent trees.</li>
      </ul>
    </div>
  );
}
