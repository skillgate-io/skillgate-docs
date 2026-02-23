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
    title: 'Getting Started',
    items: [
      { href: '/', label: 'Overview' },
      { href: '/quickstart', label: 'Quickstart' },
      { href: '/installation', label: 'Installation' },
      { href: '/concepts', label: 'Core Concepts' },
    ],
  },
  {
    title: 'CLI Reference',
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
    title: 'Runtime',
    items: [
      { href: '/runtime-control', label: 'Runtime Control' },
      { href: '/artifacts', label: 'Artifact Coverage' },
      { href: '/intelligence', label: 'Intelligence' },
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
    title: 'Integrations',
    items: [
      { href: '/integrations', label: 'Overview' },
      { href: '/integrations/github-actions', label: 'GitHub Actions' },
      { href: '/integrations/gitlab-ci', label: 'GitLab CI' },
    ],
  },
  {
    title: 'More',
    items: [
      { href: '/security', label: 'Security' },
      { href: '/migrations', label: 'Migrations' },
      { href: '/changelog', label: 'Changelog' },
    ],
  },
];
