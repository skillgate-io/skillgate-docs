import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'claude - CLI Reference',
  description: 'Complete Claude Code governance command reference: scan, hooks, plugins, settings, approvals, behavior, policy packs, and ledger.',
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
          Use this command group to govern real Claude Code risk surfaces: hooks, instruction files,
          plugins, settings, approval workflow, behavior drift, incidents, and local audit ledger.
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
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Group', 'Subcommands', 'What you use it for'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['root', 'scan, incidents', 'Scan Claude surfaces and correlate high-confidence incidents.'],
              ['hooks', 'list, approve, deny, audit, diff', 'Control and review hook execution risk.'],
              ['plugins', 'list, attest, block, trust-key, sync', 'Govern plugin trust and signed metadata.'],
              ['settings', 'drift', 'Detect permission expansion against baseline.'],
              ['agents', 'lineage, risk', 'Track sub-agent lineage and risk hotspots.'],
              ['approvals', 'baseline, check', 'Protect critical files with explicit approval state.'],
              ['behavior', 'baseline, drift', 'Detect behavior drift by actor and surface.'],
              ['policy-packs', 'list, show, apply', 'Apply opinionated guardrails quickly.'],
              ['ledger', 'verify, tail', 'Verify and inspect tamper-evident local audit events.'],
            ].map(([group, subcommands, desc]) => (
              <tr key={group} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--accent)' }}>{group}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{subcommands}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Incidents, approvals, and policy packs</h2>
      <CodeBlock
        language="bash"
        code={`# Correlate findings into incidents
skillgate claude incidents --directory . --output json

# Baseline protected-file approvals and validate changes
skillgate claude approvals baseline --directory .
skillgate claude approvals check --directory . --ci

# Explore and apply a policy pack
skillgate claude policy-packs list
skillgate claude policy-packs show secure-default
skillgate claude policy-packs apply secure-default --directory .`}
      />

      <h2>Behavior, lineage, and ledger</h2>
      <CodeBlock
        language="bash"
        code={`# Baseline and drift-check behavior
skillgate claude behavior baseline --directory .
skillgate claude behavior drift --directory . --ci

# Agent lineage and risk
skillgate claude agents lineage --directory .
skillgate claude agents risk --directory .

# Local audit ledger integrity and recent events
skillgate claude ledger verify --directory .
skillgate claude ledger tail --directory . --limit 50`}
      />
    </div>
  );
}
