import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Enterprise Compliance',
  description: 'AI-BOM inventory, EU AI Act evidence, and signed runtime audit workflows for enterprise compliance.',
};

export default function EnterpriseCompliancePage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Enterprise</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Enterprise Compliance
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Compliance workflows for AI inventory management, policy enforcement evidence, and runtime
          provenance. Supports teams building audit trails for the EU AI Act and similar frameworks.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Regulatory evidence path</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 2.2, paddingLeft: '20px', marginBottom: '32px' }}>
        {[
          'Generate AI-BOM inventories for approved runtime components using CycloneDX format.',
          'Attach signed provenance metadata to enforcement decisions.',
          'Retain session DAG artifacts for audit reconstruction.',
          'Export SARIF reports for security tab integration in GitHub and GitLab.',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ul>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Compliance workflow example</h2>
      <CodeBlock language="bash" code={`# 1. Import a CycloneDX BOM and create the approved store
skillgate bom import ./bom.cyclonedx.json --output .skillgate/bom/approved.json

# 2. Run the agent with full enforcement and provenance
skillgate run \\
  --env strict \\
  --skill-id approved-agent-skill \\
  --skill-hash <sha256> \\
  --scan-attestation valid \\
  --artifact .skillgate/runtime/session.json \\
  -- codex exec "prepare release notes"

# 3. Verify the session artifact for audit
skillgate dag verify .skillgate/runtime/session.json

# 4. Compute transitive risk score
skillgate dag risk .skillgate/runtime/session.json --output json`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Evidence artifacts</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Artifact', 'Format', 'Use'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Scan attestation', 'Ed25519-signed JSON', 'Proves scan ran and policy passed.'],
              ['Session DAG artifact', 'Signed JSON', 'Full runtime lineage with decision trail.'],
              ['AI-BOM store', 'CycloneDX JSON', 'Approved runtime component inventory.'],
              ['Approval file', 'Signed JSON', 'Reviewer quorum proof for deployment gates.'],
              ['SARIF report', 'SARIF 2.1.0', 'CI security tab and audit export.'],
            ].map(([artifact, format, use]) => (
              <tr key={artifact} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontWeight: 500, color: 'var(--text)' }}>{artifact}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{format}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
