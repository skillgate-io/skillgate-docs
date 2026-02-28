import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'bom - CLI Reference',
  description: 'Import CycloneDX AI bills of materials and validate skill invocations against approved BOM stores.',
};

export default function BomPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>bom</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Manage AI Bills of Materials (AI-BOM) for runtime gateway enforcement.
          Import a CycloneDX JSON document to create an approved BOM store, then validate
          skill invocations against it before runtime commands execute.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate bom import <cyclonedx-path> [OPTIONS]
skillgate bom validate [OPTIONS]`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>bom import</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Converts a CycloneDX JSON BOM into a SkillGate-approved BOM store. The output file is used
        by <code>skillgate run</code> and <code>skillgate gateway check</code> for runtime validation.
      </p>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Flag / Arg', 'Required', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['cyclonedx-path', 'Yes', '', 'Path to the CycloneDX JSON BOM file.'],
              ['--output', 'No', '.skillgate/bom/approved.json', 'Output path for the approved BOM store.'],
            ].map(([flag, req, def, desc]) => (
              <tr key={flag} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{flag}</td>
                <td style={{ padding: '8px 14px', fontSize: '0.78rem', color: req === 'Yes' ? 'var(--accent)' : 'var(--text-muted)' }}>{req}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{def || '—'}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>bom validate</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Validates a skill invocation against the approved BOM store. Use in CI or pre-deployment pipelines
        to confirm a skill is in the approved inventory before it runs.
      </p>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Flag', 'Required', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['--skill-id', 'Yes', '', 'Skill identifier to validate.'],
              ['--skill-hash', 'No', '', 'Skill content hash to validate.'],
              ['--scan-attestation', 'No', '', 'SkillGate scan attestation marker.'],
              ['--mode', 'No', 'strict', 'Validation mode: dev, ci, prod, strict.'],
              ['--store', 'No', '.skillgate/bom/approved.json', 'Path to approved AI-BOM store JSON.'],
            ].map(([flag, req, def, desc]) => (
              <tr key={flag} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{flag}</td>
                <td style={{ padding: '8px 14px', fontSize: '0.78rem', color: req === 'Yes' ? 'var(--accent)' : 'var(--text-muted)' }}>{req}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{def || '—'}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>
      <CodeBlock language="bash" code={`# Import a CycloneDX BOM and create the approved store
skillgate bom import ./bom.cyclonedx.json --output .skillgate/bom/approved.json

# Validate a skill before deployment
skillgate bom validate \\
  --skill-id my-agent-skill \\
  --skill-hash <sha256> \\
  --scan-attestation valid \\
  --mode prod

# Use in a full compliance workflow
skillgate bom import ./bom.cyclonedx.json
skillgate run \\
  --env strict \\
  --skill-id my-agent-skill \\
  --skill-hash <sha256> \\
  --scan-attestation valid \\
  -- codex exec "deploy release"`} />
    </div>
  );
}
