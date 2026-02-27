import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Python SDK Integration',
  description:
    'SkillGate Python SDK guide with @enforce runtime policy checks, sidecar decision flow, AI-BOM registration, and enterprise fail-closed deployment patterns.',
};

export default function PythonSdkIntegrationPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Integrations
        </div>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            margin: 0,
          }}
        >
          Python SDK
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Embed SkillGate runtime decisions directly in Python tools and agent framework adapters.
        </p>
      </div>

      <h2>Install and configure</h2>
      <CodeBlock
        language="bash"
        code={`pip install skillgate-sdk
export SKILLGATE_SLT="<session-license-token>"
export SKILLGATE_SIDECAR_URL="http://127.0.0.1:9911"`}
      />

      <h2>Decorator enforcement</h2>
      <CodeBlock
        language="python"
        code={`from skillgate.sdk import enforce

@enforce(capabilities=["net.http"], package_version="1.2.3")
def call_api(url: str) -> str:
    ...

# ALLOW -> function executes
# DENY -> CapabilityDeniedError
# REQUIRE_APPROVAL -> ApprovalPendingError`}
      />

      <h2>Onboarding and production behavior</h2>
      <CodeBlock
        language="text"
        code={`Preflight expectations:
1) Sidecar running
2) SLT available
3) Policy and entitlements loaded

Production recommendation:
- fail_closed (default) for enterprise services
- fail_open only with explicit degraded-mode policy`}
      />

      <h2>AI-BOM and registry flow</h2>
      <CodeBlock
        language="text"
        code={`When a wrapped tool runs:
- SDK sends decide request to sidecar
- SDK upserts tool metadata to /v1/registry/{tool_name}
- SDK updates integration manifest for governance tracking`}
      />

      <h2>Related pages</h2>
      <ul>
        <li>
          <Link href="/integrations/vscode-extension" className="sg-link">
            VS Code extension integration
          </Link>
        </li>
        <li>
          <Link href="/integrations/codex-cli" className="sg-link">
            Codex CLI integration
          </Link>
        </li>
        <li>
          <Link href="/enterprise/security" className="sg-link">
            Enterprise security
          </Link>
        </li>
      </ul>
    </div>
  );
}
