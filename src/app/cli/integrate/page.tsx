import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'integrate - CLI Reference',
  description: 'Generate framework-specific SkillGate SDK integration code for PydanticAI, LangChain, CrewAI, or generic Python projects.',
};

export default function IntegratePage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>integrate</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Generate copy-ready integration code so you can add SkillGate enforcement to your Python agent stack quickly.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate integrate [--framework <name>] [--detect] [--output <file>]`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>Framework values</h2>
      <CodeBlock language="text" code={`pydantic-ai | langchain | crewai | generic`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>Examples</h2>
      <CodeBlock
        language="bash"
        code={`# Detect frameworks available in your current environment
skillgate integrate --detect

# Print LangChain integration code to terminal
skillgate integrate --framework langchain

# Write code directly to a file in your repo
skillgate integrate --framework pydantic-ai --output ./tools/skillgate_enforce.py

# Use generic template for custom stacks
skillgate integrate --framework generic`}
      />
    </div>
  );
}
