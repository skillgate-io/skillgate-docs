import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'API Key Scopes',
  description: 'What each SkillGate API key scope allows and where it is enforced.',
};

export default function ApiKeyScopesPage() {
  return (
    <div style={{ maxWidth: '760px' }} className="sg-prose">
      <h1>API key scopes</h1>
      <p>
        Scopes define what an API key can do. SkillGate stores scopes on every key and enforces
        them on API routes that support API-key authentication.
      </p>

      <h2>Current scope map</h2>
      <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid var(--border)', padding: '10px' }}>
                Scope
              </th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid var(--border)', padding: '10px' }}>
                What it allows
              </th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid var(--border)', padding: '10px' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>
                <code>scan:read</code>
              </td>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>
                Read scan history and scan detail endpoints.
              </td>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>Enforced</td>
            </tr>
            <tr>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>
                <code>scan:write</code>
              </td>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>
                Submit new scan reports.
              </td>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>Enforced</td>
            </tr>
            <tr>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>
                <code>team:read</code>
              </td>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>
                Read team details and member lists.
              </td>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>Enforced</td>
            </tr>
            <tr>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>
                <code>team:write</code>
              </td>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>
                Create teams, invite members, and remove members.
              </td>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>Enforced</td>
            </tr>
            <tr>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>
                <code>billing:read</code>
              </td>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>
                Access billing portal links and read subscription status.
              </td>
              <td style={{ borderBottom: '1px solid var(--border)', padding: '10px' }}>Enforced</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Example</h2>
      <p>Create a key scoped for CI upload only:</p>
      <CodeBlock
        language="bash"
        code={`curl -X POST "$SKILLGATE_API_BASE/api/v1/api-keys" \\
  -H "Authorization: Bearer $ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"ci-upload","scopes":["scan:write"]}'`}
      />
      <p>
        That key can submit scans but cannot read scan history unless <code>scan:read</code> is also
        included.
      </p>

      <p>
        Want end-to-end setup? See <Link href="/quickstart">Quickstart</Link> and{' '}
        <Link href="/cli/auth">CLI auth</Link>.
      </p>
    </div>
  );
}
