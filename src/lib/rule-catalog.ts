import ruleCatalogJson from '@/lib/generated/rule-catalog.json';

type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface RuleCatalogEntry {
  id: string;
  name: string;
  description: string;
  severity: Severity;
  weight: number;
  category: string;
}

interface RuleCatalogData {
  generated_at: string;
  total_rules: number;
  rules: RuleCatalogEntry[];
}

export interface RuleCategoryMeta {
  id: string;
  label: string;
  href: string;
  desc: string;
  examples: string[];
  languages: string[];
}

const CATALOG = ruleCatalogJson as RuleCatalogData;

export const RULE_CATEGORIES: RuleCategoryMeta[] = [
  {
    id: 'SG-SHELL-*',
    label: 'Shell',
    href: '/rules/shell',
    desc: 'Subprocess spawning, OS-level command execution, pipe chaining, and destructive shell operations.',
    examples: ['subprocess.run()', 'os.system()', 'child_process exec', 'Runtime.exec()'],
    languages: ['Python', 'JavaScript', 'TypeScript', 'Shell', 'Go', 'Rust', 'Ruby'],
  },
  {
    id: 'SG-NET-*',
    label: 'Network',
    href: '/rules/network',
    desc: 'Network egress, DNS lookups, HTTP callbacks, raw socket connections, and data exfiltration patterns.',
    examples: ['urllib.request', 'fetch()', 'net.Socket', 'dns.resolve()'],
    languages: ['Python', 'JavaScript', 'TypeScript', 'Shell', 'Go', 'Rust', 'Ruby'],
  },
  {
    id: 'SG-FS-*',
    label: 'Filesystem',
    href: '/rules/filesystem',
    desc: 'Filesystem writes, destructive deletes, and access to sensitive paths like /etc/passwd or ~/.ssh.',
    examples: ['open(..., "w")', 'fs.writeFile()', 'shutil.rmtree()', '/etc/shadow'],
    languages: ['Python', 'JavaScript', 'TypeScript', 'Shell', 'Go', 'Rust', 'Ruby'],
  },
  {
    id: 'SG-EVAL-*',
    label: 'Eval',
    href: '/rules/eval',
    desc: 'Dynamic code execution, runtime evaluation, unsafe deserialization, and dynamic import patterns.',
    examples: ['eval()', 'exec()', 'pickle.loads()', '__import__()'],
    languages: ['Python', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'SG-CRED-*',
    label: 'Credentials',
    href: '/rules/credentials',
    desc: 'Hardcoded credentials, token exposure in logs, and secret leakage patterns.',
    examples: ['password =', 'api_key =', 'SECRET_KEY', 'Authorization: Bearer'],
    languages: ['Python', 'JavaScript', 'TypeScript', 'Shell', 'Go', 'Rust', 'Ruby'],
  },
  {
    id: 'SG-INJ-*',
    label: 'Injection',
    href: '/rules/injection',
    desc: 'Prompt injection, SQL injection, command injection, and unsafe input-to-execution flows.',
    examples: ['f"SELECT {user}"', 'f"rm {path}"', 'system(input)', 'prompt + user_text'],
    languages: ['Python', 'JavaScript', 'TypeScript', 'Shell', 'Go', 'Rust', 'Ruby'],
  },
  {
    id: 'SG-OBF-*',
    label: 'Obfuscation',
    href: '/rules/obfuscation',
    desc: 'Base64 payloads, encoded scripts, and anti-analysis indicators.',
    examples: ['base64.b64decode()', 'codecs.decode()', 'eval(atob())', '\\x41\\x42\\x43'],
    languages: ['Python', 'JavaScript', 'TypeScript', 'Shell'],
  },
];

const CATEGORY_BY_PREFIX: Record<string, RuleCategoryMeta> = {
  SHELL: RULE_CATEGORIES[0],
  NET: RULE_CATEGORIES[1],
  FS: RULE_CATEGORIES[2],
  EVAL: RULE_CATEGORIES[3],
  CRED: RULE_CATEGORIES[4],
  INJ: RULE_CATEGORIES[5],
  OBF: RULE_CATEGORIES[6],
};

export type CoreCategoryPrefix = 'SHELL' | 'NET' | 'FS' | 'EVAL' | 'CRED' | 'INJ' | 'OBF';

export const TOTAL_RULE_COUNT = CATALOG.total_rules;

export const CORE_CATEGORY_COUNT = RULE_CATEGORIES.length;

export function getRulesForCategory(prefix: CoreCategoryPrefix): RuleCatalogEntry[] {
  return CATALOG.rules.filter((rule) => rule.category === prefix);
}

export function getCategoryRuleCount(prefix: CoreCategoryPrefix): number {
  return getRulesForCategory(prefix).length;
}

export function getCategoryMeta(prefix: CoreCategoryPrefix): RuleCategoryMeta {
  return CATEGORY_BY_PREFIX[prefix];
}

export function getCatalogCoverageSummary(): string {
  const covered = RULE_CATEGORIES.reduce((acc, category) => {
    const prefix = category.id.split('-')[1] as CoreCategoryPrefix;
    return acc + getCategoryRuleCount(prefix);
  }, 0);
  return `${covered} core-category rules (${TOTAL_RULE_COUNT} total registry rules)`;
}

export function getCoveredCoreRuleCount(): number {
  return RULE_CATEGORIES.reduce((acc, category) => {
    const prefix = category.id.split('-')[1] as CoreCategoryPrefix;
    return acc + getCategoryRuleCount(prefix);
  }, 0);
}

export function getAllCatalogRules(): RuleCatalogEntry[] {
  return CATALOG.rules;
}
