import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'CLI Commands',
  description: 'Complete reference for all SkillGate CLI commands.',
};

const COMMANDS = [
  { cmd: 'scan', path: '/cli/scan', desc: 'Scan a skill bundle for security risks. Supports local paths, archives, and ClawHub URLs.' },
  { cmd: 'verify', path: '/cli/verify', desc: 'Verify a signed attestation report using the Ed25519 public key.' },
  { cmd: 'init', path: '/cli/init', desc: 'Generate a skillgate.yml policy configuration file in the current directory.' },
  { cmd: 'auth', path: '/cli/auth', desc: 'Log in, log out, and manage credentials for the SkillGate hosted service.' },
  { cmd: 'keys', path: '/cli/keys', desc: 'Generate and manage Ed25519 signing keypairs in ~/.skillgate/keys/.' },
  { cmd: 'hooks', path: '/cli/hooks', desc: 'Install or remove git pre-commit hooks that run scan before each commit.' },
  { cmd: 'rules', path: '/rules', desc: 'List all available detection rules with their IDs, severity, and categories.' },
  { cmd: 'run', path: '/cli/run', desc: 'Run an agent CLI through runtime gateway enforcement (Enterprise).' },
  { cmd: 'mcp', path: '/cli/mcp', desc: 'Manage trusted MCP providers, audits, and permission change checks.' },
  { cmd: 'claude', path: '/cli/claude', desc: 'Protect Claude hooks, plugins, settings, and instruction files.' },
  { cmd: 'codex', path: '/cli/codex', desc: 'Run Codex with safer defaults, provider trust checks, and CI protections.' },
  { cmd: 'gateway', path: '/cli/gateway', desc: 'Native hook commands for agent integrations and pre-execution checks.' },
  { cmd: 'bom', path: '/cli/bom', desc: 'Import and validate trusted component manifests (CycloneDX format).' },
  { cmd: 'hunt', path: '/cli/hunt', desc: 'Search historical scan reports by rule ID, severity, or file pattern.' },
  { cmd: 'version', path: '/cli', desc: 'Show the installed version, build metadata, and runtime info.' },
];

export default function CLIPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Commands
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          All SkillGate commands follow the pattern <code>skillgate &lt;command&gt; [options] [arguments]</code>.
        </p>
      </div>

      <CodeBlock
        language="text"
        code={`skillgate <command> [options] [arguments]

Core:
  scan         Scan a skill bundle for security risks
  verify       Verify a signed attestation report
  init         Initialize a policy configuration file
  rules        List available detection rules
  version      Show version information

Auth & keys:
  auth         Authentication commands
  keys         Manage signing keys

Developer:
  hooks        Manage git pre-commit hooks
  run          Agent runtime gateway enforcement
  mcp          MCP governance commands
  claude       Claude ecosystem governance commands
  codex        Codex protections for local and CI runs
  gateway      Native hook commands
  bom          Trusted component manifest import and validation
  hunt         Search historical scan reports`}
      />

      <div style={{ marginTop: '32px' }}>
        {COMMANDS.map((c) => (
          <div
            key={c.cmd}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '14px 0',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <Link
              href={c.path}
              style={{
                fontFamily: 'monospace',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--accent)',
                textDecoration: 'none',
                minWidth: '90px',
                paddingTop: '1px',
              }}
            >
              {c.cmd}
            </Link>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{c.desc}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Exit codes</h2>
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--sidebar-bg)' }}>
                <th style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Code</th>
                <th style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                { code: '0', meaning: 'Success: scan passed, no violations.' },
                { code: '1', meaning: 'Policy violation: one or more findings exceeded the policy threshold.' },
                { code: '2', meaning: 'Internal error: unexpected failure during analysis.' },
                { code: '3', meaning: 'Invalid input: bad arguments, missing files, or malformed policy.' },
              ].map((row, i) => (
                <tr key={row.code} style={{ borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--text)' }}>{row.code}</td>
                  <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Environment variables</h2>
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--sidebar-bg)' }}>
                <th style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Variable</th>
                <th style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {[
                { var: 'SKILLGATE_API_KEY', purpose: 'Required for entitlement-resolved commands. Prefix: sg_free_ or sg_pro_.' },
                { var: 'SKILLGATE_POLICY', purpose: 'Default policy file or preset name. Overridden by --policy flag.' },
                { var: 'SKILLGATE_OUTPUT', purpose: 'Default output format: human, json, sarif.' },
                { var: 'SKILLGATE_NO_COLOR', purpose: 'Set to 1 to disable colored terminal output.' },
                { var: 'SKILLGATE_API_URL', purpose: 'Override the hosted API endpoint (Enterprise on-prem).' },
              ].map((row, i) => (
                <tr key={row.var} style={{ borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{row.var}</td>
                  <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
