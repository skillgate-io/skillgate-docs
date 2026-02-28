import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'auth - CLI Reference',
  description: 'Manage SkillGate authentication and credentials.',
};

export default function AuthPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>auth</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Log in, log out, and manage credentials for the SkillGate hosted service.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Subcommands</h2>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>auth login</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem' }}>
          Use this when you are working locally and want to connect the CLI to your SkillGate account.
          It opens a browser, completes sign-in, and stores credentials on your machine.
        </p>
        <CodeBlock language="bash" code="skillgate auth login" />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>auth logout</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem' }}>
          Sign out from this machine and remove the saved local session.
        </p>
        <CodeBlock language="bash" code="skillgate auth logout" />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>auth whoami</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem' }}>
          Show which account is currently active in this terminal session.
        </p>
        <CodeBlock language="bash" code="skillgate auth whoami" />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>auth status</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem' }}>
          Show whether you are authenticated, plus your active tier and usage status.
        </p>
        <CodeBlock language="bash" code={`skillgate auth status
skillgate auth whoami`} />
      </div>

      <Callout variant="tip">
        For CI environments, use an <code>SKILLGATE_API_KEY</code> environment variable instead of interactive login.
        API keys never expire and work in headless environments.
      </Callout>
    </div>
  );
}
