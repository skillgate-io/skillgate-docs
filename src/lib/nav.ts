export interface NavItem {
  href: string;
  label: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV: NavSection[] = [
  {
    title: 'Start',
    items: [
      { href: '/', label: 'Overview' },
      { href: '/get-started', label: 'Get Started' },
      { href: '/quickstart', label: 'Quickstart' },
      { href: '/installation', label: 'Installation' },
      { href: '/concepts', label: 'Core Concepts' },
    ],
  },
  {
    title: 'Use Cases',
    items: [
      { href: '/use-cases', label: 'Overview' },
      { href: '/use-cases/openclaw-gateway', label: 'Protect OpenClaw Gateway' },
      { href: '/use-cases/claude-code', label: 'Protect Claude Code' },
      { href: '/use-cases/codex-cli', label: 'Protect Codex CLI' },
      { href: '/use-cases/mcp-gateway', label: 'Protect MCP Gateway' },
      { href: '/use-cases/ci-gating', label: 'Secure CI Gating' },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { href: '/integrations', label: 'Overview' },
      { href: '/integrations/vscode-extension', label: 'VS Code Extension' },
      { href: '/integrations/python-sdk', label: 'Python SDK' },
      { href: '/integrations/skillgate-agents', label: 'SkillGate Agents' },
      { href: '/integrations/codex-cli', label: 'Codex CLI' },
      { href: '/integrations/claude-code', label: 'Claude Code' },
      { href: '/integrations/mcp-gateway', label: 'MCP Gateway' },
      { href: '/integrations/github-actions', label: 'GitHub Actions' },
      { href: '/integrations/gitlab-ci', label: 'GitLab CI' },
    ],
  },
  {
    title: 'Validation',
    items: [{ href: '/validation-evidence', label: 'Validation Evidence' }],
  },
  {
    title: 'CLI',
    items: [
      { href: '/cli', label: 'Commands' },
      { href: '/cli/scan', label: 'scan' },
      { href: '/cli/verify', label: 'verify' },
      { href: '/cli/init', label: 'init' },
      { href: '/cli/simulate', label: 'simulate' },
      { href: '/cli/submit-scan', label: 'submit-scan' },
      { href: '/cli/hunt', label: 'hunt' },
      { href: '/cli/retroscan', label: 'retroscan' },
      { href: '/cli/auth', label: 'auth' },
      { href: '/cli/keys', label: 'keys' },
      { href: '/cli/hooks', label: 'hooks' },
      { href: '/cli/approval', label: 'approval' },
      { href: '/cli/run', label: 'run' },
      { href: '/cli/gateway', label: 'gateway' },
      { href: '/cli/bom', label: 'bom' },
      { href: '/cli/mcp', label: 'mcp' },
      { href: '/cli/claude', label: 'claude' },
      { href: '/cli/codex', label: 'codex' },
      { href: '/cli/dag', label: 'dag' },
      { href: '/cli/drift', label: 'drift' },
      { href: '/cli/reputation', label: 'reputation' },
      { href: '/cli/doctor', label: 'doctor' },
    ],
  },
  {
    title: 'Detection Rules',
    items: [
      { href: '/rules', label: 'Overview' },
      { href: '/rules/shell', label: 'Shell (SG-SHELL-*)' },
      { href: '/rules/network', label: 'Network (SG-NET-*)' },
      { href: '/rules/filesystem', label: 'Filesystem (SG-FS-*)' },
      { href: '/rules/eval', label: 'Eval (SG-EVAL-*)' },
      { href: '/rules/credentials', label: 'Credentials (SG-CRED-*)' },
      { href: '/rules/injection', label: 'Injection (SG-INJ-*)' },
      { href: '/rules/obfuscation', label: 'Obfuscation (SG-OBF-*)' },
    ],
  },
  {
    title: 'Policy',
    items: [{ href: '/policy', label: 'Policy Reference' }],
  },
  {
    title: 'Security and Governance',
    items: [
      { href: '/agent-gateway', label: 'Agent Gateway' },
      { href: '/runtime-control', label: 'Runtime Control' },
      { href: '/artifacts', label: 'Artifact Coverage' },
      { href: '/intelligence', label: 'Intelligence' },
      { href: '/governance', label: 'Governance' },
      { href: '/operations', label: 'Operations' },
      { href: '/security', label: 'Security' },
    ],
  },
  {
    title: 'Enterprise',
    items: [
      { href: '/enterprise', label: 'Overview' },
      { href: '/enterprise/security', label: 'Security' },
      { href: '/enterprise/compliance', label: 'Compliance' },
      { href: '/enterprise/deployment', label: 'Deployment' },
      { href: '/enterprise/procurement', label: 'Procurement' },
    ],
  },
  {
    title: 'More',
    items: [
      { href: '/legal', label: 'Legal' },
      { href: '/product', label: 'Product' },
      { href: '/changelog', label: 'Changelog' },
    ],
  },
];
