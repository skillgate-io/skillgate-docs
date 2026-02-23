import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'scan — CLI Reference',
  description: 'Full reference for the skillgate scan command: all flags, output formats, fleet mode, watch mode, and examples.',
};

const FLAGS = [
  { flag: '--output, -o', default: 'human', desc: 'Output format: human, json, or sarif.' },
  { flag: '--policy, -p', default: 'none', desc: 'Policy file path or preset name: development, staging, production, strict.' },
  { flag: '--enforce', default: 'false', desc: 'Enable enforcement mode. Exit 1 on any policy violation.' },
  { flag: '--sign', default: 'false', desc: 'Sign the report with Ed25519. Requires Pro tier or higher.' },
  { flag: '--key-dir', default: '~/.skillgate/keys/', desc: 'Custom directory for the signing key.' },
  { flag: '--report-file', default: 'stdout', desc: 'Write the report to a file instead of stdout.' },
  { flag: '--quiet, -q', default: 'false', desc: 'Suppress all output except errors.' },
  { flag: '--verbose, -v', default: 'false', desc: 'Enable verbose debug output.' },
  { flag: '--no-color', default: 'false', desc: 'Disable colored terminal output.' },
  { flag: '--fleet', default: 'false', desc: 'Enable fleet scan mode: scan all skill bundles under a root path in parallel.' },
  { flag: '--require-skill-manifest', default: 'false', desc: 'Fleet: only scan directories that contain a skill manifest.' },
  { flag: '--fail-on-any', default: 'false', desc: 'Fleet: exit 1 if any single bundle fails.' },
  { flag: '--fail-on-threshold', default: 'none', desc: 'Fleet: exit 1 if fail rate % meets or exceeds this value (0-100).' },
  { flag: '--fleet-workers', default: '4', desc: 'Fleet: maximum parallel worker count (1-32).' },
  { flag: '--watch', default: 'false', desc: 'Re-scan on file changes. Requires optional watchdog dependency.' },
  { flag: '--mode, -m', default: 'default', desc: 'Scan mode: default, agent-output (tool output poisoning), or pre-commit.' },
  { flag: '--explain', default: 'false', desc: 'Add explanations to findings using offline templates or AI.' },
  { flag: '--explain-source', default: 'auto', desc: 'Explanation source: auto, offline, or ai.' },
  { flag: '--explain-mode', default: 'technical', desc: 'Explanation style: technical or executive.' },
  { flag: '--llm-provider', default: 'none', desc: 'LLM provider for AI explanations: anthropic or openai.' },
  { flag: '--reputation-store', default: '.skillgate/reputation/reputation.json', desc: 'Path to signed reputation graph JSON.' },
  { flag: '--reputation-env', default: 'ci', desc: 'Reputation decision environment: dev, ci, prod, or strict.' },
  { flag: '--submit', default: 'false', desc: 'Submit the scan report to the hosted API after scanning.' },
];

export default function ScanPage() {
  return (
    <div style={{ maxWidth: '780px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>scan</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Scan a skill bundle for security risks. Supports local directories, archive files,
          fleet mode for multi-bundle scanning, watch mode, and AI-powered explanations.
        </p>
      </div>

      <CodeBlock
        language="text"
        code={`skillgate scan <path|url> [options]

Arguments:
  path|url    Local skill directory, .zip/.tar.gz archive, or ClawHub URL`}
      />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Options</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.85rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Flag', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FLAGS.map((row, i) => (
              <tr key={row.flag} style={{ borderBottom: i < FLAGS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.76rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{row.flag}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.76rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{row.default}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)', lineHeight: 1.5, fontSize: '0.85rem' }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Basic scan</h3>
      <CodeBlock language="bash" code="skillgate scan ./skills/my-skill" />

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Output formats</h3>
      <CodeBlock language="bash" code={`skillgate scan ./skills/my-skill --output json\nskillgate scan ./skills/my-skill --output sarif --report-file results.sarif`} />

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Enforce with a preset</h3>
      <CodeBlock language="bash" code={`skillgate scan ./skills/my-skill --enforce --policy production\nskillgate scan ./skills/my-skill --enforce --policy ./skillgate.yml`} />

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Sign the report</h3>
      <CodeBlock language="bash" code="skillgate scan ./skills/my-skill --sign --report-file report.json" />

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Fleet mode</h3>
      <CodeBlock language="bash" code={`# Scan all bundles under ./skills/
skillgate scan ./skills --fleet

# Fail if any bundle fails
skillgate scan ./skills --fleet --fail-on-any --policy production

# Fail if more than 20% of bundles fail
skillgate scan ./skills --fleet --fail-on-threshold 20

# Only scan directories with a skill manifest
skillgate scan ./skills --fleet --require-skill-manifest

# Use 8 parallel workers
skillgate scan ./skills --fleet --fleet-workers 8`} />

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Watch mode</h3>
      <CodeBlock language="bash" code="skillgate scan ./skills/my-skill --watch" />
      <Callout variant="warning" title="watchdog required">
        Watch mode requires the optional watchdog dependency. Install with <code>pip install &apos;skillgate[watch]&apos;</code>.
      </Callout>

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>AI-powered explanations</h3>
      <CodeBlock language="bash" code={`# Offline template explanations (no API call)
skillgate scan ./skills/my-skill --explain

# AI explanations via Anthropic
skillgate scan ./skills/my-skill --explain --explain-source ai --llm-provider anthropic

# Executive summary style
skillgate scan ./skills/my-skill --explain --explain-mode executive`} />

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Scan + auto submit to API</h3>
      <CodeBlock language="bash" code="skillgate scan ./skills/my-skill --enforce --policy production --submit" />

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>CI quiet mode</h3>
      <CodeBlock language="bash" code="skillgate scan ./skills/my-skill --enforce --policy production --quiet" />

      <Callout variant="info" title="Performance">
        Cold start under 2 seconds. 10 files in under 3 seconds. Fleet uses 4 parallel workers by default.
        Files over 100KB are skipped with a warning. Zero network calls during local scan.
      </Callout>
    </div>
  );
}
