import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PageWithTOC } from '@/components/ui/PageWithTOC';

export const metadata: Metadata = {
  title: 'Observability | SkillGate',
  description:
    'Prometheus metrics, OpenTelemetry tracing, tamper-evident audit logs, and SIEM webhooks for AI agent enforcement. Ingest SkillGate data into Datadog, Splunk, or Elastic.',
  keywords: [
    'AI agent observability',
    'agent enforcement metrics',
    'Prometheus AI agent monitoring',
    'OpenTelemetry agent tracing',
    'SIEM AI agents',
    'Datadog AI agent security',
    'Splunk AI agent audit',
    'AI audit log',
    'agent anomaly detection',
    'SkillGate SIEM export',
  ],
  openGraph: {
    title: 'Observability | SkillGate',
    description:
      'Prometheus metrics, OpenTelemetry tracing, tamper-evident audit logs, and SIEM webhooks for every agent tool invocation.',
    type: 'article',
  },
};

const TOC = [
  { id: 'prometheus', label: 'Prometheus metrics' },
  { id: 'otel', label: 'OpenTelemetry tracing' },
  { id: 'audit-log', label: 'Audit log' },
  { id: 'siem', label: 'SIEM webhooks' },
  { id: 'pii', label: 'PII redaction' },
  { id: 'risk', label: 'Risk scoring' },
  { id: 'anomaly', label: 'Anomaly detection' },
  { id: 'export', label: 'Export' },
  { id: 'config', label: 'Configuration' },
];

export default function ObservabilityPage() {
  return (
    <PageWithTOC items={TOC}>
      <div style={{ maxWidth: '720px' }} className="sg-prose">
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Runtime
          </div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              margin: 0,
            }}
          >
            Observability
          </h1>
          <p
            style={{
              color: 'var(--text-muted)',
              marginTop: '12px',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            Every enforcement decision leaves a trace. Scrape metrics into Prometheus, follow spans
            in any OTLP backend, and forward deny events to your existing SIEM. No changes to agent
            behavior are required.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
          {['Prometheus', 'OpenTelemetry', 'Datadog', 'Splunk', 'Elastic', 'Audit Chain', 'Risk Scoring'].map(
            (item) => (
              <span
                key={item}
                style={{
                  fontSize: '0.78rem',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border: '1px solid var(--border)',
                  background: 'var(--sidebar-bg)',
                  color: 'var(--text)',
                }}
              >
                {item}
              </span>
            )
          )}
        </div>

        {/* ── Prometheus ── */}
        <h2 id="prometheus">Prometheus metrics</h2>
        <p>
          The sidecar exposes a standard <code>/metrics</code> endpoint. Five metrics cover the
          full enforcement surface: decision outcomes, latency distribution, budget exhaustion,
          circuit state, and license mode.
        </p>
        <CodeBlock
          language="text"
          code={`# Scrape the sidecar
curl http://127.0.0.1:9911/metrics

# Available metrics
skillgate_decisions_total{decision_code, tool, workspace}
skillgate_decision_latency_ms_bucket{le}
skillgate_budget_exceeded_total{capability, workspace}
skillgate_circuit_state{component}
skillgate_license_mode{mode, workspace}`}
        />
        <p>
          Add a <code>prometheus.yml</code> scrape job to pull from the sidecar. The sidecar
          starts on port 9911 by default; change it with <code>SKILLGATE_SIDECAR_PORT</code>.
        </p>
        <CodeBlock
          language="yaml"
          code={`scrape_configs:
  - job_name: skillgate
    static_configs:
      - targets: ['localhost:9911']
    scrape_interval: 15s`}
        />

        {/* ── OTEL ── */}
        <h2 id="otel">OpenTelemetry tracing</h2>
        <p>
          Each tool invocation produces a trace from gateway entry through every pipeline stage to
          the final decision. Spans include <code>invocation_id</code> for correlation with audit
          records. W3C <code>traceparent</code> context is propagated so SkillGate spans join your
          existing agent traces.
        </p>
        <CodeBlock
          language="yaml"
          code={`# observability.yml
tracing:
  enabled: true
  exporter: otlp-grpc          # otlp-grpc | otlp-http | console
  endpoint: "localhost:4317"
  sampling_rate: 1.0`}
        />
        <p>
          Stages traced: <code>normalize</code>, <code>enrich</code>, <code>authorize</code>,{' '}
          <code>evaluate</code>, <code>decide</code>, <code>record</code>, <code>emit</code>. The
          latency target for the full pipeline is P95 at or below 20ms; each span shows where time
          is spent if that target is breached.
        </p>

        {/* ── Audit log ── */}
        <h2 id="audit-log">Audit log</h2>
        <p>
          Every enforcement decision is appended to a workspace-scoped NDJSON log. Each entry
          carries a rolling SHA-256 hash of the previous record so that any insertion, deletion, or
          modification is detectable from the break in the chain.
        </p>
        <CodeBlock
          language="json"
          code={`{
  "ts": "2026-02-28T14:03:11.482Z",
  "invocation_id": "inv_a1b2c3",
  "tool": "bash",
  "workspace_id": "ws_acme_prod",
  "decision": "DENY",
  "decision_code": "SG_DENY_BUDGET_EXCEEDED",
  "reason_codes": ["shell.exec_rate_limit_hit"],
  "budgets": { "shell.exec": { "remaining": 0, "limit": 10 } },
  "sidecar_version": "2.0.0",
  "chain_hash": "sha256:e3b0c44298fc1c14..."
}`}
        />
        <CodeBlock
          language="bash"
          code={`# Verify audit log chain integrity
skillgate audit verify .skillgate/audit/workspace-acme.ndjson

# Show recent decisions
skillgate audit tail --workspace acme_prod --last 50`}
        />
        <p>
          Log rotation is daily by default. Configure retention (7d / 30d / 90d / 1y) per
          workspace in the control plane or via <code>observability.yml</code>.
        </p>

        {/* ── SIEM ── */}
        <h2 id="siem">SIEM webhooks</h2>
        <p>
          Configure webhooks to push enforcement events into your SIEM or SOAR. Each delivery is
          signed with HMAC-SHA256 in an <code>X-SkillGate-Signature</code> header. Failed
          deliveries are retried with exponential back-off up to three times.
        </p>
        <CodeBlock
          language="yaml"
          code={`# observability.yml
webhooks:
  - url: "https://intake.example.com/sg-events"
    events:
      - decision.deny
      - decision.approval_required
      - budget.exceeded
      - anomaly.detected
      - license.expired
    signing_key_env: SKILLGATE_WEBHOOK_KEY`}
        />

        <p>Pre-built connectors send to the native API of each platform:</p>
        <table>
          <thead>
            <tr>
              <th>SIEM</th>
              <th>Connector</th>
              <th>Format</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Datadog</td>
              <td><code>datadog</code></td>
              <td>Datadog Events API</td>
            </tr>
            <tr>
              <td>Splunk</td>
              <td><code>splunk-hec</code></td>
              <td>HTTP Event Collector</td>
            </tr>
            <tr>
              <td>Elastic</td>
              <td><code>elastic</code></td>
              <td>Elasticsearch Bulk API</td>
            </tr>
          </tbody>
        </table>
        <CodeBlock
          language="yaml"
          code={`# observability.yml — Datadog connector
siem:
  connector: datadog
  api_key_env: DD_API_KEY
  site: datadoghq.com
  test_mode: false   # set true to send one sample event and exit`}
        />

        {/* ── PII ── */}
        <h2 id="pii">PII redaction</h2>
        <p>
          Tool call parameters can contain sensitive data. Enable redaction at the workspace or
          global level without changing enforcement behavior.
        </p>
        <CodeBlock
          language="yaml"
          code={`# observability.yml
audit_log:
  mode: metadata_only    # full | redacted | metadata_only
  # full: params included (default for Pro+)
  # redacted: params replaced with [REDACTED]
  # metadata_only: tool name, timestamp, decision — no params`}
        />

        {/* ── Risk scoring ── */}
        <h2 id="risk">Risk scoring</h2>
        <p>
          Each agent carries a risk score from 0 to 100 computed from its capability profile,
          denied action rate, budget saturation, and anomaly history. Scores update after every
          decision and are available from the sidecar or control plane API.
        </p>
        <CodeBlock
          language="bash"
          code={`# Workspace-level risk overview
curl http://127.0.0.1:9911/v1/risk/workspace/ws_acme_prod

# Full agent detail with 30-day history
curl http://127.0.0.1:9911/v1/risk/agent/agent_codex_ci`}
        />
        <table>
          <thead>
            <tr>
              <th>Score</th>
              <th>Label</th>
              <th>Typical trigger</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0–29</td>
              <td>Low</td>
              <td>Read-only tooling, no denials</td>
            </tr>
            <tr>
              <td>30–59</td>
              <td>Medium</td>
              <td>Occasional denials or high-risk capabilities</td>
            </tr>
            <tr>
              <td>60–79</td>
              <td>High</td>
              <td>Frequent denials or budget saturation</td>
            </tr>
            <tr>
              <td>80–100</td>
              <td>Critical</td>
              <td>Active anomaly or repeated policy breach</td>
            </tr>
          </tbody>
        </table>

        {/* ── Anomaly ── */}
        <h2 id="anomaly">Anomaly detection</h2>
        <p>
          Three anomaly types are detected in real time. When triggered, an{' '}
          <code>anomaly.detected</code> webhook fires. A 15-minute cooldown per agent prevents
          alert fatigue from repeated identical anomalies.
        </p>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Spike</td>
              <td>Capability usage in 5-min window exceeds 3x rolling 1-hour average</td>
            </tr>
            <tr>
              <td>New capability</td>
              <td>Agent uses a capability not seen in the prior 14 days</td>
            </tr>
            <tr>
              <td>Suspicious combo</td>
              <td>
                <code>shell.exec</code> + <code>net.outbound</code> + <code>fs.write</code> within
                30 seconds
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Export ── */}
        <h2 id="export">Export</h2>
        <p>
          Pull decision records out of the audit log in batch for compliance review, external
          analytics, or archival.
        </p>
        <CodeBlock
          language="bash"
          code={`# CSV for spreadsheet review
skillgate export --workspace acme_prod \\
  --format csv \\
  --from 2026-02-01 --to 2026-02-28 \\
  --output ./reports/feb-2026.csv

# SARIF for GitHub Security tab
skillgate export --workspace acme_prod --format sarif

# Splunk HEC for bulk import
skillgate export audit \\
  --workspace acme_prod \\
  --format splunk-hec \\
  --from 2026-01-01 --to 2026-02-01`}
        />
        <p>
          Large exports are streamed and never buffered in memory. A signed manifest accompanies
          each export so recipients can verify the record set was not modified after export.
        </p>

        {/* ── Config ── */}
        <h2 id="config">Configuration reference</h2>
        <CodeBlock
          language="yaml"
          code={`# observability.yml — full reference
metrics:
  enabled: true
  port: 9911           # sidecar port; /metrics on same port

tracing:
  enabled: true
  exporter: otlp-grpc
  endpoint: "localhost:4317"
  sampling_rate: 1.0

audit_log:
  path: .skillgate/audit/
  rotation: daily
  retention: 30d       # 7d | 30d | 90d | 1y
  mode: redacted       # full | redacted | metadata_only

webhooks:
  - url: "https://..."
    events: [decision.deny, anomaly.detected]
    signing_key_env: SKILLGATE_WEBHOOK_KEY

siem:
  connector: datadog
  api_key_env: DD_API_KEY

risk:
  enabled: true
  score_window_days: 30`}
        />

        {/* ── Related ── */}
        <h2>Related pages</h2>
        <ul>
          <li>
            <Link href="/control-plane" className="sg-link">
              Control plane
            </Link>
          </li>
          <li>
            <Link href="/runtime-control" className="sg-link">
              Runtime control
            </Link>
          </li>
          <li>
            <Link href="/enterprise/compliance" className="sg-link">
              Compliance
            </Link>
          </li>
          <li>
            <Link href="/cli" className="sg-link">
              CLI reference
            </Link>
          </li>
        </ul>
      </div>
    </PageWithTOC>
  );
}
