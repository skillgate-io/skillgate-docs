import { MetadataRoute } from 'next';

const BASE = 'https://docs.skillgate.io';

// All routable pages — priority: 1.0 = home, 0.9 = top-level, 0.7 = sub-pages
const ROUTES: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '/', priority: 1.0, freq: 'weekly' },
  { path: '/get-started', priority: 0.9, freq: 'monthly' },
  { path: '/quickstart', priority: 0.9, freq: 'monthly' },
  { path: '/installation', priority: 0.9, freq: 'monthly' },
  { path: '/concepts', priority: 0.8, freq: 'monthly' },
  // CLI reference
  { path: '/cli', priority: 0.9, freq: 'monthly' },
  { path: '/cli/scan', priority: 0.8, freq: 'monthly' },
  { path: '/cli/verify', priority: 0.7, freq: 'monthly' },
  { path: '/cli/init', priority: 0.7, freq: 'monthly' },
  { path: '/cli/simulate', priority: 0.7, freq: 'monthly' },
  { path: '/cli/submit-scan', priority: 0.7, freq: 'monthly' },
  { path: '/cli/hunt', priority: 0.7, freq: 'monthly' },
  { path: '/cli/retroscan', priority: 0.7, freq: 'monthly' },
  { path: '/cli/auth', priority: 0.7, freq: 'monthly' },
  { path: '/cli/keys', priority: 0.7, freq: 'monthly' },
  { path: '/cli/hooks', priority: 0.7, freq: 'monthly' },
  { path: '/cli/approval', priority: 0.7, freq: 'monthly' },
  { path: '/cli/run', priority: 0.7, freq: 'monthly' },
  { path: '/cli/gateway', priority: 0.8, freq: 'monthly' },
  { path: '/cli/bom', priority: 0.7, freq: 'monthly' },
  { path: '/cli/dag', priority: 0.7, freq: 'monthly' },
  { path: '/cli/drift', priority: 0.7, freq: 'monthly' },
  { path: '/cli/reputation', priority: 0.7, freq: 'monthly' },
  { path: '/cli/doctor', priority: 0.7, freq: 'monthly' },
  // Detection rules — high SEO value for "AI skill vulnerability" searches
  { path: '/rules', priority: 0.9, freq: 'monthly' },
  { path: '/rules/shell', priority: 0.8, freq: 'monthly' },
  { path: '/rules/network', priority: 0.8, freq: 'monthly' },
  { path: '/rules/filesystem', priority: 0.8, freq: 'monthly' },
  { path: '/rules/eval', priority: 0.8, freq: 'monthly' },
  { path: '/rules/credentials', priority: 0.8, freq: 'monthly' },
  { path: '/rules/injection', priority: 0.8, freq: 'monthly' },
  { path: '/rules/obfuscation', priority: 0.8, freq: 'monthly' },
  // Policy
  { path: '/policy', priority: 0.8, freq: 'monthly' },
  // Runtime
  { path: '/agent-gateway', priority: 0.9, freq: 'monthly' },
  { path: '/runtime-control', priority: 0.8, freq: 'monthly' },
  { path: '/artifacts', priority: 0.7, freq: 'monthly' },
  { path: '/intelligence', priority: 0.7, freq: 'monthly' },
  // Enterprise
  { path: '/enterprise', priority: 0.8, freq: 'monthly' },
  { path: '/enterprise/security', priority: 0.7, freq: 'monthly' },
  { path: '/enterprise/compliance', priority: 0.7, freq: 'monthly' },
  { path: '/enterprise/deployment', priority: 0.7, freq: 'monthly' },
  { path: '/enterprise/procurement', priority: 0.6, freq: 'monthly' },
  // Integrations
  { path: '/integrations', priority: 0.8, freq: 'monthly' },
  { path: '/integrations/github-actions', priority: 0.8, freq: 'monthly' },
  { path: '/integrations/gitlab-ci', priority: 0.8, freq: 'monthly' },
  // More
  { path: '/governance', priority: 0.6, freq: 'monthly' },
  { path: '/security', priority: 0.7, freq: 'monthly' },
  { path: '/changelog', priority: 0.6, freq: 'weekly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map(({ path, priority, freq }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
