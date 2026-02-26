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
        Use SkillGate to gate MCP provider and tool exposure. This helps prevent unauthorized capability expansion in local agent workflows.
      </p>

      <h2>What to protect</h2>
      <ul>
        <li>Untrusted MCP providers entering the runtime graph.</li>
        <li>Poisoned tool descriptions that try to influence model behavior.</li>
        <li>Settings drift that silently broadens provider access.</li>
      </ul>

      <h2>Commands to run</h2>
      <CodeBlock
        language="bash"
        code={`# Check MCP surfaces before runtime use
skillgate mcp inspect --settings ~/.config/mcp/settings.json

# Validate provider trust and permission expansion risk
skillgate mcp settings-check --settings ~/.config/mcp/settings.json

# Run gateway checks with strict policy
skillgate run --env strict -- openclaw exec "list mcp tools"`}
      />

      <h2>Next step</h2>
      <ul>
        <li><Link href="/integrations/mcp-gateway" className="sg-link">MCP Gateway integration guide</Link></li>
        <li><Link href="/validation-evidence" className="sg-link">Validation evidence</Link></li>
      </ul>
    </div>
  );
}
