import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'export - CLI Reference',
  description: 'Export SkillGate enforcement decision records to CSV, JSON, SARIF, or SIEM streaming formats.',
};

export default function ExportPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>export</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Use this command to export runtime decision records for incident review, compliance reporting, and SIEM ingestion.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate export [options]`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>Key options</h2>
      <CodeBlock
        language="text"
        code={`--format, -f       csv | json | sarif | splunk-hec | elastic-bulk | ocsf
--from            Inclusive start date (YYYY-MM-DD or ISO-8601)
--to              Inclusive end date (YYYY-MM-DD or ISO-8601)
--workspace, -w   Filter to one workspace
--log-dir         Audit log root (default: ~/.skillgate/audit-logs)
--out, -o         Write export output to file
--manifest-out    Write signed export manifest JSON (requires --workspace)`}
      />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>Examples</h2>
      <CodeBlock
        language="bash"
        code={`# Export all records as JSON to stdout
skillgate export --format json

# Export one workspace to CSV file
skillgate export --format csv --workspace acme-prod --out ./exports/acme-prod.csv

# Export DENY records to SARIF for security tooling
skillgate export --format sarif --workspace acme-prod --out ./exports/acme-prod.sarif

# SIEM stream format with date range
skillgate export \
  --format splunk-hec \
  --workspace acme-prod \
  --from 2026-02-01 \
  --to 2026-02-28 \
  --out ./exports/acme-prod-splunk.ndjson`}
      />
    </div>
  );
}
