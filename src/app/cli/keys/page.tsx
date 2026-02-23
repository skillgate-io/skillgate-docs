import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'keys — CLI Reference',
  description: 'Manage Ed25519 signing keys for SkillGate attestation.',
};

export default function KeysPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>keys</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Generate and manage Ed25519 signing keypairs used for signing scan attestations.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Subcommands</h2>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>keys generate</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem' }}>
          Generate a new Ed25519 keypair. The private key is stored in <code>~/.skillgate/keys/</code>.
        </p>
        <CodeBlock language="bash" code={`skillgate keys generate\nskillgate keys generate --name team-key`} />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>keys list</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem' }}>Show all managed keypairs.</p>
        <CodeBlock language="bash" code="skillgate keys list" />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>keys export</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem' }}>Print the public key in PEM format for sharing with verifiers.</p>
        <CodeBlock language="bash" code={`skillgate keys export\nskillgate keys export --name team-key`} />
      </div>

      <Callout variant="danger" title="Private key security">
        Private keys stay on your machine and are never uploaded or transmitted. Do not commit <code>~/.skillgate/keys/</code> to version control.
      </Callout>
    </div>
  );
}
