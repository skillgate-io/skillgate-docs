import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Runtime Control',
  description: 'Control AI agent actions at runtime with approvals, capability limits, and signed session lineage.',
};

export default function RuntimeControlPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Runtime</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Runtime Control
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Block risky agent actions during execution, not just at code review. Every run is checked against
          policy, approvals, and capability limits before commands execute.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Runtime enforcement flow</h2>
      <CodeBlock language="text" code={`[Agent Invocation] -> [Gateway Preflight] -> [Policy + Approval Check]
       |                     |                    |
       |                     v                    v
       |              [Tool Classification]   [Budget Validation]
       |                     |                    |
       +---------------------+--------------------+
                             |
                             v
                  [Allow / Block Deterministically]
                             |
                             v
            [Signed Runtime Lineage + Session Artifact]
                             |
                             v
                    [Transitive Risk Scoring]`} />

      <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.7 }}>
        Most tools report after the fact. SkillGate runtime control prevents risky actions before they run.
      </p>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Gateway and run commands</h2>
      <CodeBlock language="bash" code={`# Wrap an agent CLI with gateway enforcement
skillgate run --env ci -- codex exec "review changed files"

# Native preflight check before a tool executes
skillgate gateway check --env prod --command "bash -lc 'git push origin main'"`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Capability budgets and approvals</h2>
      <CodeBlock language="bash" code={`# Scope capability budgets via environment variables
export SKILLGATE_BUDGET_SHELL=0
export SKILLGATE_BUDGET_NETWORK=3
export SKILLGATE_BUDGET_FILESYSTEM=5

# Require signed reviewer approvals
skillgate approval sign \\
  --skill-id my-skill \\
  --skill-hash <sha256> \\
  --reviewer sec-engineer-a \\
  --reviewer sec-engineer-b

skillgate approval verify .skillgate/approvals/approval.json \\
  --required-reviewers 2`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Lineage and transitive risk</h2>
      <CodeBlock language="bash" code={`# Verify a signed runtime session artifact
skillgate dag verify .skillgate/runtime/session.json

# Compute transitive risk metrics
skillgate dag risk .skillgate/runtime/session.json --output json`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>Related commands</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 2.2, paddingLeft: '20px' }}>
        {[
          'skillgate run — wrap agent CLI commands with full gateway enforcement',
          'skillgate gateway check — pre-execution preflight check for individual tool calls',
          'skillgate gateway scan-output — scan tool output for injection before LLM re-entry',
          'skillgate approval sign / verify — manage reviewer quorum approvals',
          'skillgate dag show / verify / risk — inspect signed session lineage artifacts',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
