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
    default: 'SkillGate Docs',
  },
  description:
    'Documentation for SkillGate — the security scanning and policy enforcement tool for AI agent skills.',
  metadataBase: new URL('https://docs.skillgate.io'),
  openGraph: {
    type: 'website',
    siteName: 'SkillGate Docs',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DocLayout>{children}</DocLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
