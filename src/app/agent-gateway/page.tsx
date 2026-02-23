import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'Agent Gateway',
  description: 'Run agent CLIs through skillgate run to enforce checks before execution.',
};

export default function AgentGatewayPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Runtime</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Agent Gateway
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Route Codex, Claude, and other agent CLIs through <code>skillgate run</code> so policy and runtime checks execute before commands run.
        </p>
      </div>

      <h2>Basic usage</h2>
      <CodeBlock
        language="bash"
        code={`# Wrap command execution
skillgate run -- codex exec "scan this repository"

# Apply strict runtime policy
skillgate run --env strict -- codex exec "run deploy script"`}
      />

      <h2>AI-BOM validation at runtime</h2>
      <CodeBlock
        language="bash"
        code={`skillgate bom import ./bom.cyclonedx.json --output .skillgate/bom/approved.json

skillgate run \
  --env strict \
  --skill-id approved-safe-skill \
  --skill-hash e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 \
  --scan-attestation valid \
  -- codex exec "open README.md"`}
      />

      <h2>TOP guard controls</h2>
      <CodeBlock
        language="bash"
        code={`skillgate run --env dev -- codex exec "summarize outputs"
skillgate run --top-outcome annotate -- codex exec "review logs"
skillgate run --top-outcome block -- codex exec "review logs"`}
      />

      <Callout variant="info" title="Execution boundary">
        SkillGate guarantees checks for commands routed through <code>skillgate run</code>. Pair this with CI and org controls to prevent bypass paths.
      </Callout>

      <h2>Related pages</h2>
      <ul>
        <li><Link href="/cli/run" className="sg-link">CLI run reference</Link></li>
        <li><Link href="/governance" className="sg-link">Governance</Link></li>
        <li><Link href="/operations" className="sg-link">Operations</Link></li>
      </ul>
    </div>
  );
}
