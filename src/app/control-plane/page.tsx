import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PageWithTOC } from '@/components/ui/PageWithTOC';

export const metadata: Metadata = {
  title: 'Control Plane | SkillGate',
  description:
    'Multi-tenant workspace isolation, RBAC, approval workflows, and policy versioning for AI agent governance. Manage enforcement policy across teams from a single control plane.',
  keywords: [
    'AI agent control plane',
    'multi-tenant AI governance',
    'AI agent RBAC',
    'agent policy management',
    'approval workflow AI agents',
    'AI compliance control plane',
    'NIST AI RMF compliance',
    'EU AI Act agent governance',
    'workspace isolation AI',
    'SkillGate enterprise',
  ],
  openGraph: {
    title: 'Control Plane | SkillGate',
    description:
      'Manage enforcement policy, approvals, and audit retention across every team and workspace from a single control plane.',
    type: 'article',
  },
};

const TOC = [
  { id: 'workspaces', label: 'Workspaces' },
  { id: 'rbac', label: 'Roles and permissions' },
  { id: 'approvals', label: 'Approval workflow' },
  { id: 'policy-versioning', label: 'Policy versioning' },
  { id: 'community-packs', label: 'Community policy packs' },
  { id: 'compliance', label: 'Compliance annotations' },
  { id: 'governance-report', label: 'Governance report' },
  { id: 'sso', label: 'SSO' },
  { id: 'api', label: 'Control plane API' },
];

export default function ControlPlanePage() {
  return (
    <PageWithTOC items={TOC}>
      <div style={{ maxWidth: '720px' }} className="sg-prose">
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Enterprise
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
            Control Plane
          </h1>
          <p
            style={{
              color: 'var(--text-muted)',
              marginTop: '12px',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            Govern AI agent enforcement across every team and environment from one place. Workspaces
            stay isolated, policies are versioned, and approvals flow through your existing review
            process.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
          {['Multi-tenant', 'RBAC', 'Approvals', 'Policy Versioning', 'NIST AI RMF', 'EU AI Act'].map(
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

        {/* ── Workspaces ── */}
        <h2 id="workspaces">Workspaces</h2>
        <p>
          Each team or environment lives in its own workspace. Workspaces share nothing by default:
          each has its own policy snapshot, audit log shard, and budget state. Data never crosses
          workspace boundaries. Isolation is enforced at the API layer and verified by automated
          cross-read tests.
        </p>
        <CodeBlock
          language="text"
          code={`Organization
└── Workspace: acme-prod
│     Policy snapshot v14  |  Audit shard  |  Budget state
└── Workspace: acme-staging
│     Policy snapshot v14  |  Audit shard  |  Budget state
└── Workspace: acme-dev
      Policy snapshot v12  |  Audit shard  |  Budget state`}
        />
        <CodeBlock
          language="bash"
          code={`# List workspaces
curl -H "Authorization: Bearer $SKILLGATE_SLT" \\
  https://api.skillgate.io/v1/workspaces

# Create a workspace
curl -X POST -H "Authorization: Bearer $SKILLGATE_SLT" \\
  https://api.skillgate.io/v1/workspaces \\
  -d '{"name":"acme-prod","environment":"production"}'`}
        />

        {/* ── RBAC ── */}
        <h2 id="rbac">Roles and permissions</h2>
        <p>
          Four roles cover the full governance surface. Roles are scoped at the organization or
          workspace level and mapped from JWT claims so SSO groups flow through automatically.
        </p>
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Policy CRUD</th>
              <th>Audit read</th>
              <th>Approve actions</th>
              <th>Team management</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>org_admin</code></td>
              <td>All workspaces</td>
              <td>All workspaces</td>
              <td>Yes</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><code>workspace_admin</code></td>
              <td>Own workspace</td>
              <td>Own workspace</td>
              <td>Yes</td>
              <td>Own workspace</td>
            </tr>
            <tr>
              <td><code>security_reviewer</code></td>
              <td>Read only</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <td><code>developer</code></td>
              <td>No</td>
              <td>Own sessions</td>
              <td>No</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
        <p>
          Role escalation is blocked at the API layer. A developer cannot grant themselves or
          others a higher role. All role changes are recorded in the audit log.
        </p>

        {/* ── Approvals ── */}
        <h2 id="approvals">Approval workflow</h2>
        <p>
          When a capability hits an <code>SG_APPROVAL_REQUIRED</code> decision, the enforcer
          pauses the tool call and creates a pending approval. A <code>security_reviewer</code> or
          above must sign off before the call is retried. Approvals carry an expiry and are
          embedded directly in the next policy snapshot so sidecars enforce them without an API
          call.
        </p>
        <CodeBlock
          language="bash"
          code={`# List pending approvals for a workspace
skillgate approval list --workspace acme-prod

# Approve from the CLI (security_reviewer+ required)
skillgate approval sign \\
  --id apr_x7k2m9 \\
  --workspace acme-prod \\
  --reviewer sec-lead@acme.com

# Check approval status
skillgate approval status --id apr_x7k2m9`}
        />
        <CodeBlock
          language="json"
          code={`{
  "approval_id": "apr_x7k2m9",
  "capability": "shell.exec",
  "workspace_id": "ws_acme_prod",
  "requesting_agent": "agent_codex_ci",
  "justification": "Lint step in CI pipeline",
  "status": "pending",
  "expires_at": "2026-03-01T00:00:00Z"
}`}
        />
        <p>
          VS Code extension surfaces pending approvals in the status bar and lets reviewers approve
          with one click. See the{' '}
          <Link href="/integrations/vscode-extension" className="sg-link">
            VS Code extension
          </Link>{' '}
          page for the full approval UI.
        </p>

        {/* ── Policy versioning ── */}
        <h2 id="policy-versioning">Policy versioning</h2>
        <p>
          Every policy change creates an immutable version record. Sidecars receive the updated
          snapshot automatically. If a change causes unexpected denials, roll back to any prior
          version with a single command.
        </p>
        <CodeBlock
          language="bash"
          code={`# Show version history for a workspace policy
skillgate policy versions --workspace acme-prod

# Apply an updated policy file
skillgate policy push \\
  --workspace acme-prod \\
  --file ./skillgate-prod.yml

# Roll back to version 12 if v14 causes issues
skillgate policy rollback \\
  --workspace acme-prod \\
  --version 12`}
        />
        <p>
          Policy diffs are validated before apply: unknown fields and capability expansions in
          production tiers require an explicit confirmation flag.
        </p>

        {/* ── Community packs ── */}
        <h2 id="community-packs">Community policy packs</h2>
        <p>
          Import a signed starting point rather than writing policy from scratch. Each pack is
          signed with the SkillGate key and verified before import. Packs are workspace-adapted on
          import so environment names and budget values match your setup.
        </p>
        <CodeBlock
          language="bash"
          code={`# List available community packs
skillgate policies list --community

# Preview a pack before importing
skillgate policies preview baseline-agent-security

# Import into a workspace
skillgate policies import baseline-agent-security \\
  --workspace acme-prod \\
  --verify-signature`}
        />
        <table>
          <thead>
            <tr>
              <th>Pack</th>
              <th>Use case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>baseline-agent-security</code></td>
              <td>Sensible defaults for most teams starting out</td>
            </tr>
            <tr>
              <td><code>high-trust-agent</code></td>
              <td>Relaxed limits for internal, well-reviewed agents</td>
            </tr>
            <tr>
              <td><code>low-trust-agent</code></td>
              <td>Tight restrictions for externally sourced or community agents</td>
            </tr>
            <tr>
              <td><code>production-hardening</code></td>
              <td>Strict production defaults with approval requirements for all writes</td>
            </tr>
            <tr>
              <td><code>ci-strict</code></td>
              <td>CI-optimized: fail-closed on unknown providers, minimal egress</td>
            </tr>
          </tbody>
        </table>

        {/* ── Compliance ── */}
        <h2 id="compliance">Compliance annotations</h2>
        <p>
          Every audit record is annotated with control IDs from NIST AI RMF and the EU AI Act.
          Annotations are additive and do not change enforcement behavior, but they make governance
          reports and regulator responses straightforward.
        </p>
        <table>
          <thead>
            <tr>
              <th>Framework</th>
              <th>Controls annotated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NIST AI RMF</td>
              <td><code>GOVERN</code>, <code>MAP</code>, <code>MEASURE</code>, <code>MANAGE</code></td>
            </tr>
            <tr>
              <td>EU AI Act</td>
              <td>
                Article 9 (risk management), Article 10 (data governance), Article 15 (accuracy),
                Article 17 (QMS)
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Governance report ── */}
        <h2 id="governance-report">Governance report</h2>
        <p>
          Generate a Markdown or PDF governance report covering a defined period. The report
          includes capability inventory, denied action summary, anomaly timeline, approval history,
          risk score trends, and compliance annotation counts. Designed for security reviews and
          board reporting.
        </p>
        <CodeBlock
          language="bash"
          code={`# 30-day governance report for acme-prod
skillgate report governance \\
  --workspace acme-prod \\
  --period 30d \\
  --output governance-feb-2026.md

# Output to PDF
skillgate report governance \\
  --workspace acme-prod \\
  --period 30d \\
  --format pdf \\
  --output governance-feb-2026.pdf`}
        />

        {/* ── SSO ── */}
        <h2 id="sso">SSO</h2>
        <p>
          Enterprise organizations can configure SAML 2.0 or OIDC single sign-on via the
          organization settings page. Once configured, all team members authenticate through your
          identity provider. Roles are mapped from IdP groups. API keys remain valid for CI/CD
          pipelines where browser-based SSO is not applicable.
        </p>
        <CodeBlock
          language="yaml"
          code={`# SSO configuration (set in the dashboard or API)
sso:
  provider: okta           # okta | azure-ad | google | generic-oidc | saml2
  entity_id: "https://acme.okta.com"
  sso_url: "https://acme.okta.com/sso/saml"
  role_mapping:
    "sg-admins": org_admin
    "sg-security": security_reviewer
    "sg-developers": developer`}
        />

        {/* ── API ── */}
        <h2 id="api">Control plane API</h2>
        <p>Key endpoints. All requests require a valid Session License Token in the{' '}
          <code>Authorization: Bearer</code> header.
        </p>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Path</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>GET</code></td>
              <td><code>/v1/workspaces</code></td>
              <td>List workspaces</td>
            </tr>
            <tr>
              <td><code>PUT</code></td>
              <td><code>/v1/policies/{'{workspace_id}'}</code></td>
              <td>Push policy update (creates new version)</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/v1/policies/{'{workspace_id}'}/rollback</code></td>
              <td>Rollback to previous version</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/v1/approvals/pending</code></td>
              <td>List unresolved approvals</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/v1/approvals/{'{id}'}/approve</code></td>
              <td>Approve a pending request</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/v1/risk/workspace/{'{workspace_id}'}</code></td>
              <td>Risk overview for all agents</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/v1/anomalies/pending</code></td>
              <td>Unacknowledged anomalies</td>
            </tr>
          </tbody>
        </table>

        {/* ── Related ── */}
        <h2>Related pages</h2>
        <ul>
          <li>
            <Link href="/observability" className="sg-link">
              Observability
            </Link>
          </li>
          <li>
            <Link href="/enterprise/compliance" className="sg-link">
              Enterprise compliance
            </Link>
          </li>
          <li>
            <Link href="/enterprise/deployment" className="sg-link">
              Deployment
            </Link>
          </li>
          <li>
            <Link href="/cli/approval" className="sg-link">
              skillgate approval
            </Link>
          </li>
        </ul>
      </div>
    </PageWithTOC>
  );
}
