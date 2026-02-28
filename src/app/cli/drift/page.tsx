import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'drift - CLI Reference',
  description: 'Baseline a skill snapshot and compare the current state to detect capability drift.',
};

export default function DriftPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>drift</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Snapshot a skill or fleet baseline, then compare it against the current state to detect capability
          drift. Catches new permissions, new network targets, hash changes, and unsigned artifacts added
          between releases.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate drift baseline <paths...> [OPTIONS]
skillgate drift check [paths...] [OPTIONS]`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>drift baseline</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Creates a baseline snapshot of the specified paths. Run this after a vetted release to establish
        the expected state.
      </p>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Flag / Arg', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['paths', '', 'Repository or bundle paths to baseline. Multiple paths allowed.'],
              ['--fleet', 'false', 'Enable fleet baseline mode across multiple bundles.'],
              ['--output', '.skillgate/drift/baseline.json', 'Output path for the baseline snapshot.'],
            ].map(([flag, def, desc]) => (
              <tr key={flag} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{flag}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{def || '—'}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>drift check</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Compares the current state against a saved baseline. Run in CI after any skill update to detect
        unexpected capability changes.
      </p>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Flag / Arg', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['paths', '', 'Paths to compare. Uses baseline paths if omitted.'],
              ['--fleet', 'false', 'Enable fleet drift comparison mode.'],
              ['--baseline', '.skillgate/drift/baseline.json', 'Path to the baseline snapshot.'],
              ['--output, -o', 'human', 'Output format: human or json.'],
              ['--fail-on-drift / --no-fail-on-drift', 'fail-on-drift', 'Exit with code 1 when drift is detected.'],
            ].map(([flag, def, desc]) => (
              <tr key={flag} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{flag}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{def || '—'}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>What drift detects</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 2.2, paddingLeft: '20px', marginBottom: '24px' }}>
        {[
          'New permissions introduced since the baseline.',
          'New external domains or network targets contacted.',
          'New unsigned runtime artifacts.',
          'Bundle hash changes.',
          'Removed or added bundles (fleet mode).',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ul>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>
      <CodeBlock language="bash" code={`# Baseline a single skill after a vetted release
skillgate drift baseline ./my-agent-skill --output .skillgate/drift/baseline.json

# Check for drift in CI
skillgate drift check ./my-agent-skill --baseline .skillgate/drift/baseline.json

# Fleet baseline across multiple bundles
skillgate drift baseline ./skills/skill-a ./skills/skill-b ./skills/skill-c --fleet

# Check without failing the CI job (report only)
skillgate drift check --no-fail-on-drift --output json`} />
    </div>
  );
}
