import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Installation',
  description: 'Install SkillGate on macOS, Linux, and Windows via pipx, pip, Homebrew, winget, or npm.',
};

export default function InstallationPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Getting Started
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Installation
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          SkillGate runs on macOS, Linux, and Windows (including WSL). Choose the install channel that fits your workflow.
        </p>
      </div>

      {/* Channel summary table */}
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '40px',
        fontSize: '0.875rem',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Channel</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Status</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Platforms</th>
            </tr>
          </thead>
          <tbody>
            {[
              { channel: 'pipx', status: 'stable', platforms: 'macOS, Linux, Windows, WSL' },
              { channel: 'pip / PyPI', status: 'stable', platforms: 'macOS, Linux, Windows, WSL' },
              { channel: 'Homebrew', status: 'beta', platforms: 'macOS' },
              { channel: 'winget', status: 'beta', platforms: 'Windows' },
              { channel: 'npm shim', status: 'beta', platforms: 'macOS, Linux, Windows, WSL' },
            ].map((row, i) => (
              <tr key={row.channel} style={{ borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '10px 16px', fontWeight: 500, color: 'var(--text)', fontFamily: 'monospace', fontSize: '0.85rem' }}>{row.channel}</td>
                <td style={{ padding: '10px 16px' }}>
                  <Badge status={row.status as 'stable' | 'beta'} />
                </td>
                <td style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>{row.platforms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pipx */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
          pipx <Badge status="stable" />
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
          Recommended for most users. pipx installs SkillGate in an isolated environment and exposes the CLI globally.
        </p>
        <CodeBlock language="bash" code="pipx install skillgate" />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '12px' }}>Verify:</p>
        <CodeBlock language="bash" code="skillgate version" />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '12px' }}>Upgrade:</p>
        <CodeBlock language="bash" code="pipx upgrade skillgate" />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '12px' }}>Uninstall:</p>
        <CodeBlock language="bash" code="pipx uninstall skillgate" />
      </section>

      {/* pip */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
          pip / PyPI <Badge status="stable" />
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
          Install directly into the active Python environment.
        </p>
        <CodeBlock language="bash" code="python -m pip install --upgrade skillgate" />
        <CodeBlock language="bash" code="skillgate version" />
      </section>

      {/* Homebrew */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
          Homebrew <Badge status="beta" />
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
          Native macOS package manager. Tap and install:
        </p>
        <CodeBlock language="bash" code="brew install skillgate" />
        <CodeBlock language="bash" code="skillgate version" />
      </section>

      {/* winget */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
          winget <Badge status="beta" />
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
          Windows Package Manager (Windows 10 1809+):
        </p>
        <CodeBlock language="powershell" code="winget install SkillGate.SkillGate" />
        <CodeBlock language="powershell" code="skillgate version" />
      </section>

      {/* npm shim */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
          npm shim <Badge status="beta" />
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
          A thin wrapper for Node.js workflows. The Python runtime must be installed separately.
        </p>
        <Callout variant="warning">
          Install the Python runtime first. The npm package is a wrapper only and requires <code>skillgate</code> on your PATH.
        </Callout>
        <CodeBlock
          language="bash"
          code={`pipx install skillgate          # install runtime first
npm install -g @skillgate/cli   # then the npm wrapper`}
        />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '12px' }}>Quick run without global install:</p>
        <CodeBlock language="bash" code="npx @skillgate/cli version" />
      </section>

      {/* Post-install */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>
          Post-install configuration
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
          Set your API key to enable all features:
        </p>
        <CodeBlock
          language="bash"
          code={`export SKILLGATE_API_KEY="sg_free_your_key_here"`}
        />
        <Callout variant="tip">
          Get a free API key at <a href="https://skillgate.io" target="_blank" rel="noopener noreferrer">skillgate.io</a>. Free tier allows up to 10 scans per minute.
        </Callout>
      </section>

      {/* Teams */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>
          Teams and organizations
        </h2>
        <ul style={{ color: 'var(--text-muted)', lineHeight: 2 }}>
          <li>Standardize on one channel per environment (pipx recommended).</li>
          <li>Pin versions in CI for reproducible builds: <code>pipx install skillgate==1.0.0</code></li>
          <li>Validate installs with <code>skillgate version</code> in bootstrap scripts.</li>
          <li>Document rollback commands per channel before any version upgrade.</li>
        </ul>
      </section>

      {/* Version pinning */}
      <section>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>
          Version pinning and rollback
        </h2>
        <div style={{
          border: '1px solid var(--border)',
          borderRadius: '10px',
          overflow: 'hidden',
          fontSize: '0.875rem',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--sidebar-bg)' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Channel</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Pin to version</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ch: 'pipx', cmd: 'pipx install skillgate==1.0.0' },
                { ch: 'pip', cmd: 'pip install skillgate==1.0.0' },
                { ch: 'Homebrew', cmd: 'brew install skillgate@1.0.0' },
                { ch: 'winget', cmd: 'winget install SkillGate.SkillGate --version 1.0.0' },
                { ch: 'npm', cmd: 'npm install -g @skillgate/cli@1.0.0' },
              ].map((row, i) => (
                <tr key={row.ch} style={{ borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 500, color: 'var(--text)' }}>{row.ch}</td>
                  <td style={{ padding: '10px 16px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.cmd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
