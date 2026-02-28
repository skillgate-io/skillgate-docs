import { CORE_CATEGORY_COUNT, TOTAL_RULE_COUNT, getAllCatalogRules } from '@/lib/rule-catalog';
import { NAV } from '@/lib/nav';

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  section: string;
  keywords?: string[];
}

const BASE_SEARCH_INDEX: SearchEntry[] = [
  // Getting Started
  { href: '/', title: 'Overview', description: 'SkillGate runtime security docs for OpenClaw, Claude Code, Codex CLI, and MCP governance.', section: 'Getting Started', keywords: ['home', 'overview', 'introduction', 'openclaw', 'claude code', 'codex', 'mcp'] },
  { href: '/quickstart', title: 'Quickstart', description: 'Scan your first skill in 5 minutes. Install, set API key, run scan.', section: 'Getting Started', keywords: ['install', 'start', 'first scan', 'pipx'] },
  { href: '/installation', title: 'Installation', description: 'Install via pipx, pip, Homebrew, winget, or npm shim. All platforms.', section: 'Getting Started', keywords: ['pipx', 'pip', 'brew', 'homebrew', 'winget', 'npm', 'install', 'setup'] },
  { href: '/concepts', title: 'Core Concepts', description: 'How SkillGate works: rules, risk scoring, policy enforcement, attestations.', section: 'Getting Started', keywords: ['pipeline', 'scoring', 'attestation', 'ed25519', 'deterministic'] },
  { href: '/api-key-scopes', title: 'API Key Scopes', description: 'Scope reference for API keys: scan read/write and route-level enforcement behavior.', section: 'Getting Started', keywords: ['api key scopes', 'scan:read', 'scan:write', 'team:read', 'team:write', 'billing:read', 'api authz'] },

  // Use Cases
  { href: '/use-cases', title: 'Use Cases', description: 'Task-first guides for local AI agent security across OpenClaw, Claude Code, Codex CLI, MCP, and CI.', section: 'Use Cases', keywords: ['use cases', 'workflow', 'task first', 'local ai security', 'agent security'] },
  { href: '/use-cases/openclaw-gateway', title: 'Protect OpenClaw Gateway', description: 'Secure OpenClaw gateway execution paths with runtime policy checks and signed evidence.', section: 'Use Cases', keywords: ['openclaw gateway security', 'openclaw runtime protection', 'tool execution policy'] },
  { href: '/use-cases/claude-code', title: 'Protect Claude Code', description: 'Protect Claude Code hooks, settings, plugins, and instruction files with policy enforcement.', section: 'Use Cases', keywords: ['claude code security', 'claude hooks protection', 'agents.md security', 'claude.md security'] },
  { href: '/use-cases/codex-cli', title: 'Protect Codex CLI', description: 'Protect Codex CLI sessions with CI guard mode, trusted providers, and instruction safety checks.', section: 'Use Cases', keywords: ['codex cli security', 'openai codex security', 'trusted providers', 'ci guard mode'] },
  { href: '/use-cases/mcp-gateway', title: 'Protect MCP Gateway', description: 'Protect MCP gateway provider trust and block unsafe metadata expansion.', section: 'Use Cases', keywords: ['mcp security', 'mcp gateway security', 'tool description poisoning', 'provider allowlist'] },
  { href: '/use-cases/ci-gating', title: 'Secure CI Gating', description: 'Secure pull requests and release pipelines with deterministic SkillGate policy enforcement.', section: 'Use Cases', keywords: ['ci security gate', 'github actions security gate', 'gitlab ci security gate', 'signed evidence'] },

  // CLI Reference
  { href: '/cli', title: 'CLI Commands', description: 'All SkillGate CLI commands. Exit codes and environment variables reference.', section: 'CLI Reference', keywords: ['commands', 'cli', 'terminal', 'exit codes', 'env vars'] },
  { href: '/cli/scan', title: 'scan', description: 'Scan a skill bundle. Fleet mode, watch mode, signing, SARIF output.', section: 'CLI Reference', keywords: ['scan', 'fleet', 'enforce', 'sarif', 'json', 'sign', 'watch', 'explain', 'mode', 'output'] },
  { href: '/cli/simulate', title: 'simulate', description: 'Dry-run policy impact across bundles without enforcing.', section: 'CLI Reference', keywords: ['simulate', 'dry-run', 'impact', 'policy', 'org'] },
  { href: '/cli/verify', title: 'verify', description: 'Verify a signed Ed25519 attestation report.', section: 'CLI Reference', keywords: ['verify', 'signature', 'attestation', 'ed25519', 'public key'] },
  { href: '/cli/submit-scan', title: 'submit-scan', description: 'Submit a scan report JSON to the hosted API for storage.', section: 'CLI Reference', keywords: ['submit', 'upload', 'report', 'api', 'storage'] },
  { href: '/cli/rules', title: 'rules', description: 'List available detection rules and filter by category or output format.', section: 'CLI Reference', keywords: ['rules command', 'list rules', 'category filter', 'rule ids', 'json rules'] },
  { href: '/cli/retroscan', title: 'retroscan', description: 'Replay historical scans with updated rules to see impact diffs.', section: 'CLI Reference', keywords: ['retroscan', 'replay', 'historical', 'rules', 'diff'] },
  { href: '/cli/hunt', title: 'hunt', description: 'Search historical scan reports using the hunt DSL query language.', section: 'CLI Reference', keywords: ['hunt', 'search', 'historical', 'query', 'dsl', 'reports'] },
  { href: '/cli/init', title: 'init', description: 'Generate a skillgate.yml policy configuration file.', section: 'CLI Reference', keywords: ['init', 'config', 'policy file', 'yaml', 'skillgate.yml'] },
  { href: '/cli/auth', title: 'auth', description: 'Login, logout, whoami - manage SkillGate credentials.', section: 'CLI Reference', keywords: ['auth', 'login', 'logout', 'whoami', 'credentials', 'token'] },
  { href: '/cli/keys', title: 'keys', description: 'Generate, list, and export Ed25519 signing keypairs for attestation verification workflows.', section: 'CLI Reference', keywords: ['keys', 'generate', 'ed25519', 'signing', 'keypair', 'list', 'export', 'include-private', 'output-file'] },
  { href: '/cli/hooks', title: 'hooks', description: 'Install or remove git pre-commit hooks that run scan before commits.', section: 'CLI Reference', keywords: ['hooks', 'git', 'pre-commit', 'install', 'uninstall'] },
  { href: '/cli/approval', title: 'approval', description: 'Create and verify signed approval files for reviewer quorum enforcement.', section: 'CLI Reference', keywords: ['approval', 'sign', 'verify', 'request', 'quorum', 'reviewer', 'runtime'] },
  { href: '/cli/run', title: 'run', description: 'Wrap an agent CLI with runtime gateway enforcement. Checks policy, approvals, and reputation before execution.', section: 'CLI Reference', keywords: ['run', 'gateway', 'runtime', 'agent', 'enforcement', 'bom', 'approval', 'top'] },
  { href: '/cli/integrate', title: 'integrate', description: 'Generate framework-specific integration code for PydanticAI, LangChain, CrewAI, or generic Python stacks.', section: 'CLI Reference', keywords: ['integrate', 'pydantic-ai', 'langchain', 'crewai', 'framework', 'sdk integration'] },
  { href: '/cli/doctor', title: 'doctor', description: 'Diagnose installation, auth, and environment health.', section: 'CLI Reference', keywords: ['doctor', 'diagnose', 'health', 'troubleshoot', 'status'] },
  { href: '/cli/gateway', title: 'gateway', description: 'Pre-execution checks and tool output poisoning scan for native agent integration.', section: 'CLI Reference', keywords: ['gateway', 'check', 'scan-output', 'top', 'tool output poisoning', 'hooks'] },
  { href: '/cli/bom', title: 'bom', description: 'Import CycloneDX AI bills of materials and validate skill invocations.', section: 'CLI Reference', keywords: ['bom', 'cyclonedx', 'bill of materials', 'import', 'validate', 'ai-bom'] },
  { href: '/cli/mcp', title: 'mcp', description: 'Manage MCP provider allowlists, registry drift controls, and settings governance checks.', section: 'CLI Reference', keywords: ['mcp', 'allow', 'deny', 'inspect', 'audit', 'settings-check', 'tool poisoning'] },
  { href: '/cli/claude', title: 'claude', description: 'Govern Claude ecosystem surfaces: hooks, plugins, settings, instruction files, and policy packs.', section: 'CLI Reference', keywords: ['claude', 'hooks', 'plugins', 'settings', 'instruction injection', 'policy packs'] },
  { href: '/cli/codex', title: 'codex', description: 'Run Codex with safer defaults, configuration safety checks, and trusted provider controls.', section: 'CLI Reference', keywords: ['codex', 'safe codex', 'ci', 'agents.md', 'configuration safety', 'trustedproviders'] },
  { href: '/cli/dag', title: 'dag', description: 'Session lineage DAG: show, verify, and compute transitive risk metrics.', section: 'CLI Reference', keywords: ['dag', 'lineage', 'session', 'artifact', 'risk', 'show', 'verify'] },
  { href: '/cli/drift', title: 'drift', description: 'Baseline a snapshot and compare current state to detect capability drift.', section: 'CLI Reference', keywords: ['drift', 'baseline', 'check', 'comparison', 'snapshot'] },
  { href: '/cli/reputation', title: 'reputation', description: 'Signed reputation graph: verify integrity, check bundle hashes, submit verdicts.', section: 'CLI Reference', keywords: ['reputation', 'verify', 'check', 'submit', 'verdict', 'bundle hash', 'graph', 'sg-rep-miss', 'reputation store', 'reputation.json', '--reputation-store'] },
  { href: '/cli/report', title: 'report', description: 'Generate governance reports for workspace-level security and compliance review.', section: 'CLI Reference', keywords: ['report', 'governance', 'workspace report', 'markdown report', 'period'] },
  { href: '/cli/export', title: 'export', description: 'Export decision records to CSV, JSON, SARIF, Splunk HEC, Elastic Bulk, or OCSF.', section: 'CLI Reference', keywords: ['export', 'decision records', 'csv', 'json', 'sarif', 'splunk', 'elastic', 'ocsf'] },
  { href: '/cli/version', title: 'version', description: 'Show the installed SkillGate version.', section: 'CLI Reference', keywords: ['version', 'cli version', 'installed version', 'skillgate version'] },

  // Detection Rules
  {
    href: '/rules',
    title: 'Rule Catalog',
    description: `${TOTAL_RULE_COUNT} static analysis rules across 7 languages with ${CORE_CATEGORY_COUNT} core categories documented here.`,
    section: 'Detection Rules',
    keywords: ['rules', 'catalog', String(TOTAL_RULE_COUNT), 'detection', 'static analysis'],
  },
  { href: '/rules/shell', title: 'Shell Rules (SG-SHELL-*)', description: 'subprocess, os.system, child_process.exec, rm -rf, pty.spawn detection.', section: 'Detection Rules', keywords: ['shell', 'subprocess', 'os.system', 'exec', 'rm', 'bash', 'command'] },
  { href: '/rules/network', title: 'Network Rules (SG-NET-*)', description: 'urllib, requests, raw socket, DNS, FTP, SMTP, SSH egress detection.', section: 'Detection Rules', keywords: ['network', 'http', 'socket', 'dns', 'ftp', 'smtp', 'ssh', 'egress'] },
  { href: '/rules/filesystem', title: 'Filesystem Rules (SG-FS-*)', description: 'File writes, deletes, /etc/passwd, ~/.ssh, ~/.aws credential path access.', section: 'Detection Rules', keywords: ['filesystem', 'write', 'delete', 'rmtree', 'passwd', 'ssh', 'credentials'] },
  { href: '/rules/eval', title: 'Eval Rules (SG-EVAL-*)', description: 'eval(), exec(), pickle.loads(), yaml.load(), new Function() detection.', section: 'Detection Rules', keywords: ['eval', 'exec', 'pickle', 'yaml', 'dynamic', 'code execution', 'deserialize'] },
  { href: '/rules/credentials', title: 'Credential Rules (SG-CRED-*)', description: 'Hardcoded passwords, API keys, AWS keys, GitHub tokens, PEM private keys.', section: 'Detection Rules', keywords: ['credentials', 'password', 'api key', 'aws', 'github', 'token', 'secret', 'pem'] },
  { href: '/rules/injection', title: 'Injection Rules (SG-INJ-*)', description: 'Prompt injection, SQL injection, command injection, template injection.', section: 'Detection Rules', keywords: ['injection', 'sql', 'command', 'prompt', 'template', 'nosql', 'ldap'] },
  { href: '/rules/obfuscation', title: 'Obfuscation Rules (SG-OBF-*)', description: 'base64 decode+exec, ROT13, hex decode, atob+eval, zlib decompress.', section: 'Detection Rules', keywords: ['obfuscation', 'base64', 'rot13', 'hex', 'atob', 'encoding'] },

  // Policy
  { href: '/policy', title: 'Policy Reference', description: 'Policy YAML schema, presets (development/staging/production/strict), resolution order.', section: 'Policy', keywords: ['policy', 'yaml', 'schema', 'preset', 'fail_on', 'threshold', 'max_score', 'enforce'] },

  // Runtime
  { href: '/runtime-control', title: 'Runtime Control', description: 'Runtime policy flow, block reasons, budgets, fallback modes, and evidence verification.', section: 'Runtime', keywords: ['runtime', 'control', 'gateway', 'preflight', 'lineage', 'budget', 'approval', 'fallback', 'access'] },
  { href: '/agent-gateway', title: 'Agent Gateway', description: 'Route Claude and Codex execution through skillgate run for enforced runtime policy.', section: 'Runtime', keywords: ['agent gateway', 'claude code', 'codex cli', 'skillgate run', 'runtime guardrails'] },
  { href: '/observability', title: 'Observability', description: 'Prometheus metrics, OpenTelemetry tracing, NDJSON audit log with hash chain, SIEM webhooks for Datadog, Splunk, and Elastic, per-agent risk scoring, and anomaly detection.', section: 'Runtime', keywords: ['observability', 'prometheus', 'opentelemetry', 'otel', 'audit log', 'siem', 'datadog', 'splunk', 'elastic', 'risk scoring', 'anomaly detection', 'metrics', 'tracing', 'webhook', 'pii redaction', 'hash chain', 'skillgate export'] },
  { href: '/control-plane', title: 'Control Plane', description: 'Multi-tenant workspace isolation, RBAC with four roles, approval workflow, immutable policy versioning, community policy packs, NIST AI RMF and EU AI Act compliance annotations, governance report, and SSO.', section: 'Runtime', keywords: ['control plane', 'saas', 'multi-tenant', 'workspace', 'rbac', 'role', 'org admin', 'security reviewer', 'approval workflow', 'policy versioning', 'rollback', 'community policy packs', 'nist ai rmf', 'eu ai act', 'compliance', 'governance report', 'sso', 'saml', 'oidc'] },
  { href: '/artifacts', title: 'Artifact Coverage', description: 'Scan ZIP, PDF, DOCX, markdown, configs, and source directories with provenance tagging.', section: 'Runtime', keywords: ['artifacts', 'zip', 'pdf', 'docx', 'markdown', 'config', 'provenance'] },
  { href: '/intelligence', title: 'Intelligence', description: 'Reputation signals, historical queries, and retroscans to prioritize findings.', section: 'Runtime', keywords: ['intelligence', 'reputation', 'hunt', 'retroscan', 'executive', 'explain'] },

  // Enterprise
  { href: '/enterprise', title: 'Enterprise', description: 'Enterprise hub for security review, compliance, deployment, and procurement.', section: 'Enterprise', keywords: ['enterprise', 'team', 'organization', 'sso', 'rbac', 'sla'] },
  { href: '/enterprise/security', title: 'Enterprise Security', description: 'Threat model, identity controls, and incident readiness for enterprise review.', section: 'Enterprise', keywords: ['enterprise security', 'threat model', 'sso', 'saml', 'oidc', 'rbac', 'incident'] },
  { href: '/enterprise/compliance', title: 'Enterprise Compliance', description: 'AI-BOM evidence, EU AI Act workflows, and signed runtime audit trails.', section: 'Enterprise', keywords: ['compliance', 'eu ai act', 'ai-bom', 'audit', 'cyclonedx', 'provenance'] },
  { href: '/enterprise/deployment', title: 'Enterprise Deployment', description: 'SaaS, private relay, air-gap, and local deployment modes with rollout guidance.', section: 'Enterprise', keywords: ['deployment', 'saas', 'private relay', 'air-gap', 'rollout', 'network'] },
  { href: '/enterprise/procurement', title: 'Enterprise Procurement', description: 'Commercial checklist, DPA review, and onboarding path for buyers.', section: 'Enterprise', keywords: ['procurement', 'commercial', 'dpa', 'sla', 'onboarding', 'legal'] },

  // Integrations
  { href: '/integrations', title: 'Integrations Overview', description: 'Integrations for VS Code extension, Python SDK, OpenClaw, Codex CLI, Claude Code, MCP Gateway, GitHub Actions, and GitLab CI.', section: 'Integrations', keywords: ['integrations', 'vscode extension', 'python sdk', 'openclaw', 'local ai agents', 'codex', 'claude', 'mcp', 'ci', 'cicd', 'github', 'gitlab'] },
  { href: '/integrations/vscode-extension', title: 'VS Code Extension Integration', description: 'Shift-left editor policy diagnostics, onboarding preflight, and runtime-aware guardrails.', section: 'Integrations', keywords: ['vscode extension security', 'claude code vscode extension', 'codex vscode extension', 'prompt injection detection vscode', 'editor policy linting'] },
  { href: '/integrations/python-sdk', title: 'Python SDK Integration', description: 'Decorator-based runtime gating with sidecar decisions, AI-BOM registry updates, and fail-closed defaults.', section: 'Integrations', keywords: ['python sdk security', 'agent runtime sdk', '@enforce decorator', 'sidecar policy decision', 'ai-bom registry'] },
  { href: '/integrations/language-shims', title: 'Language Shims', description: 'Lightweight sidecar HTTP clients for Go, Ruby, Rust, .NET, Java, and TypeScript. Call POST /v1/decide from any language stack without a Python dependency.', section: 'Integrations', keywords: ['go sdk', 'ruby sdk', 'rust sdk', 'dotnet sdk', 'java sdk', 'typescript sdk', 'language shims', 'multi-language', 'sidecar client', 'go enforcement', 'ruby enforcement', 'rust enforcement', '.net enforcement', 'java enforcement', 'nodejs enforcement'] },
  { href: '/integrations/skillgate-agents', title: 'SkillGate Agents (Claude Plugin)', description: 'Install SkillGate Agents for Claude Code with repo-scope and user-scope governance, slash commands, and runtime enforcement.', section: 'Integrations', keywords: ['skillgate agents', 'claude code plugin', 'claude plugin marketplace', 'repo scope', 'user scope', 'agents.md protection', 'claude runtime security'] },
  { href: '/validation-evidence', title: 'Validation Evidence', description: 'Real testbed evidence with corpus sizes and authenticated sidecar replay statistics from public agent repositories.', section: 'Integrations', keywords: ['validation evidence', 'testbed', 'openclaw security testing', 'openclaw official skills testing', 'nanobot skills security testing', 'clawhub skills security testing', 'claude code security testing', 'codex cli security testing', 'mcp security testing', 'agent security proof'] },
  { href: '/integrations/codex-cli', title: 'Codex CLI Integration', description: 'Run Codex with SkillGate safety checks, trusted providers, and CI-ready defaults.', section: 'Integrations', keywords: ['codex', 'codex cli', 'integration', 'provider trust', 'ci', 'local ai agent security'] },
  { href: '/integrations/claude-code', title: 'Claude Code Integration', description: 'Protect Claude hooks, settings, plugins, and instruction files with SkillGate policy checks.', section: 'Integrations', keywords: ['claude code', 'integration', 'hooks', 'plugins', 'instruction safety', 'agent guardrails'] },
  { href: '/integrations/mcp-gateway', title: 'MCP Gateway Integration', description: 'Approve trusted MCP providers and block unsafe capability expansion.', section: 'Integrations', keywords: ['mcp', 'gateway', 'integration', 'provider trust', 'permissions', 'openclaw gateway security'] },
  { href: '/integrations/github-actions', title: 'GitHub Actions', description: 'Gate PRs with SkillGate. SARIF upload to Security tab. Matrix scans. Caching.', section: 'Integrations', keywords: ['github actions', 'workflow', 'sarif', 'security tab', 'pull request', 'matrix'] },
  { href: '/integrations/gitlab-ci', title: 'GitLab CI', description: 'Add SkillGate to .gitlab-ci.yml. SAST artifact reports. MR enforcement.', section: 'Integrations', keywords: ['gitlab', 'gitlab ci', 'gitlab-ci.yml', 'sast', 'merge request'] },

  // More
  { href: '/security', title: 'Security', description: 'Baseline controls, data handling, and responsible disclosure process.', section: 'More', keywords: ['security', 'controls', 'disclosure', 'tls', 'attestation', 'data'] },
  { href: '/migrations', title: 'Migrations', description: 'Upgrade guidance for self-hosted SkillGate deployments.', section: 'More', keywords: ['migrations', 'upgrade', 'alembic', 'database', 'rollback'] },
  { href: '/changelog', title: 'Changelog', description: 'SkillGate release history: v1.0.0, v0.9.0, v0.7.0.', section: 'More', keywords: ['changelog', 'releases', 'version', 'history', 'updates'] },
];

const RULE_PAGE_BY_PREFIX: Record<string, string> = {
  SHELL: '/rules/shell',
  NET: '/rules/network',
  FS: '/rules/filesystem',
  EVAL: '/rules/eval',
  CRED: '/rules/credentials',
  INJ: '/rules/injection',
  OBF: '/rules/obfuscation',
};

function ruleSearchEntries(): SearchEntry[] {
  return getAllCatalogRules().map((rule) => {
    const prefix = rule.id.split('-')[1] ?? '';
    const href = RULE_PAGE_BY_PREFIX[prefix] ?? '/rules';
    return {
      href,
      title: `${rule.id} · ${rule.name}`,
      description: `${rule.description} (Severity: ${rule.severity}, Weight: ${rule.weight}).`,
      section: 'Detection Rules',
      keywords: [
        rule.id,
        rule.id.toLowerCase(),
        rule.name,
        rule.name.toLowerCase(),
        rule.category,
        'rule id',
        'detection rule',
      ],
    };
  });
}

function navCoverageEntries(existing: SearchEntry[]): SearchEntry[] {
  const existingHrefs = new Set(existing.map((entry) => entry.href));
  const entries: SearchEntry[] = [];
  for (const section of NAV) {
    for (const item of section.items) {
      if (existingHrefs.has(item.href)) continue;
      entries.push({
        href: item.href,
        title: item.label,
        description: `${item.label} documentation page.`,
        section: section.title,
        keywords: [item.label.toLowerCase(), section.title.toLowerCase(), item.href],
      });
    }
  }
  return entries;
}

export const SEARCH_INDEX: SearchEntry[] = (() => {
  const merged = [...BASE_SEARCH_INDEX, ...ruleSearchEntries()];
  return [...merged, ...navCoverageEntries(merged)];
})();

export function searchIndex(query: string): SearchEntry[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/);

  return SEARCH_INDEX.filter((entry) => {
    const haystack = [
      entry.title,
      entry.description,
      entry.section,
      ...(entry.keywords ?? []),
    ]
      .join(' ')
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  }).slice(0, 12);
}
