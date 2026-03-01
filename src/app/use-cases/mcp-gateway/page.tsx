import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Protect MCP Gateway',
  description:
    'Protect MCP gateway workflows with SkillGate provider trust enforcement and metadata poisoning controls.',
};

export default function UseCaseMcpPage() {
  return (
    <div style={{ maxWidth: '740px' }} className="sg-prose">
      <h1>Protect MCP Gateway</h1>
      <p>
        Use this workflow when you need trusted provider controls and settings drift checks before MCP tools are exposed.
      </p>

      <h2>Command order</h2>
      <p><strong>Step 1:</strong> approve each trusted MCP server with endpoint, checksum, and permissions.</p>
      <CodeBlock
        language="bash"
        code={`skillgate mcp allow filesystem \\
  --endpoint http://127.0.0.1:8901 \\
  --checksum <sha256> \\
  --permissions fs.read,fs.write`}
      />

      <p><strong>Step 2:</strong> run settings drift checks before starting agent sessions.</p>
      <CodeBlock
        language="bash"
        code={`skillgate mcp settings-check \\
  --project-settings .claude/settings.json \\
  --global-settings ~/.claude/settings.json \\
  --baseline .skillgate/settings-baseline.json \\
  --ci`}
      />

      <p><strong>Step 3:</strong> inspect and audit provider state for change review.</p>
      <CodeBlock language="bash" code={`skillgate mcp inspect filesystem
skillgate mcp audit --limit 50`} />

      <h2>Why this order works</h2>
      <ul>
        <li>Trust is established before runtime exposure.</li>
        <li>Settings drift is caught before permissions expand silently.</li>
        <li>Audit records support incident review and compliance reporting.</li>
      </ul>

      <h2>Next step</h2>
      <ul>
        <li><Link href="/integrations/mcp-gateway" className="sg-link">MCP Gateway integration guide</Link></li>
        <li><Link href="/validation-evidence" className="sg-link">Validation evidence</Link></li>
      </ul>
    </div>
  );
}
