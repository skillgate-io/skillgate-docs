import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { DocLayout } from '@/components/layout/DocLayout';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | SkillGate Docs',
    default: 'SkillGate Docs: AI Agent Skill Security Scanner',
  },
  description:
    'SkillGate is a CLI-first security scanner that blocks malicious AI agent skills before they reach your OpenClaw gateway, MCP server, or any AI agent orchestration pipeline. 119 detection rules, signed attestations, CI/CD native.',
  keywords: [
    'AI agent security',
    'AI skill scanner',
    'OpenClaw security',
    'OpenClaw gateway protection',
    'malicious skill detection',
    'AI agent policy enforcement',
    'agent orchestration security',
    'MCP server security',
    'AI agent vulnerability scanner',
    'CLI security scanner',
    'CI/CD AI security gate',
    'SkillGate',
    'agent skill governance',
    'AI supply chain security',
  ],
  metadataBase: new URL('https://docs.skillgate.io'),
  alternates: {
    canonical: 'https://docs.skillgate.io',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillGate Docs',
    title: 'SkillGate: Block Malicious AI Agent Skills at the Gateway',
    description:
      'Stop compromised skills before they execute. SkillGate scans AI agent skills across 7 languages, enforces policy, and gates your OpenClaw or MCP pipeline with signed attestations.',
    url: 'https://docs.skillgate.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillGate: AI Agent Skill Security Scanner',
    description:
      'Block malicious AI agent skills before they reach your OpenClaw gateway or orchestration pipeline. 119 detection rules, policy presets, CI/CD native.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'SkillGate',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'macOS, Linux, Windows',
      description:
        'CLI-first security scanner and policy enforcement tool that blocks malicious AI agent skills before they reach an OpenClaw gateway, MCP server, or any agent orchestration pipeline.',
      url: 'https://skillgate.io',
      sameAs: ['https://docs.skillgate.io', 'https://github.com/skillgate-io'],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        '119 detection rules across Python, JavaScript, TypeScript, Shell, Go, Rust, Ruby',
        'OpenClaw gateway skill protection',
        'MCP server security scanning',
        'AI agent skill vulnerability detection',
        'Ed25519 signed scan attestations',
        'GitHub Actions and GitLab CI integration',
        'SARIF output for GitHub Security tab',
        'Policy enforcement presets: development, staging, production, strict',
        'Multi-artifact scanning for ZIP, PDF, DOCX',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'SkillGate Documentation',
      url: 'https://docs.skillgate.io',
      description:
        'Official documentation for SkillGate, the AI agent skill security scanner and policy enforcement tool.',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DocLayout>{children}</DocLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
