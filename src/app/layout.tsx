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
    'SkillGate protects OpenClaw gateways and agent runtimes from unsafe tool actions, instruction injection, and untrusted providers.',
  keywords: [
    'AI agent security',
    'AI skill scanner',
    'OpenClaw security',
    'OpenClaw gateway protection',
    'local AI agent security',
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
    'Claude Code security',
    'Codex CLI security',
    'AGENTS.md injection detection',
    'configuration safety checks',
    'runtime protection',
    'MCP provider trust',
    'config poisoning detection',
    'trusted provider enforcement',
    'instruction injection protection',
    'agent security validation evidence',
    'ai agent security testbed',
    'openclaw official skills security',
    'nanobot skills security',
    'clawhub skills security',
    'authenticated sidecar replay',
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
      'Stop compromised skills before tools execute. SkillGate protects OpenClaw, Claude Code, Codex CLI, and MCP tool paths with clear policy controls.',
    url: 'https://docs.skillgate.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillGate: AI Agent Skill Security Scanner',
    description:
      'Secure local AI gateways and agent runtimes with practical policy controls and clear audit trails.',
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
        'Claude Code ecosystem governance',
        'Codex CLI workflow protection',
        'Config poisoning detection for agent config surfaces',
        'Instruction injection detection for AGENTS.md and CLAUDE.md',
        'Trusted provider verification with checksum re-approval',
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
