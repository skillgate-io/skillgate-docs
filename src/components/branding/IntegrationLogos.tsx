import Image from 'next/image';

const ROW_ITEMS = ['openclaw', 'vscode', 'claude', 'codex', 'mcp', 'github', 'gitlab'] as const;

export function IntegrationLogos() {
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: '10px',
        background: 'var(--sidebar-bg)',
        padding: '14px 16px',
        marginBottom: '24px',
      }}
      aria-label="Supported integrations"
    >
      <div
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '10px',
        }}
      >
        Integrations
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '34px', rowGap: '14px', alignItems: 'center' }}>
        {ROW_ITEMS.map((item) => (
          <div
            key={item}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 44,
            }}
          >
            {item === 'openclaw' && (
              <Image
                src="/images/integrations/openclaw-icon.svg"
                alt="OpenClaw"
                width={42}
                height={42}
                style={{ height: '42px', width: '42px', objectFit: 'contain' }}
              />
            )}

            {item === 'claude' && (
              <>
                <Image
                  src="/images/integrations/claude-code-light.svg"
                  alt="Claude Code"
                  width={220}
                  height={40}
                  className="block dark:hidden"
                  style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
                />
                <Image
                  src="/images/integrations/claude-code-dark.svg"
                  alt="Claude Code"
                  width={220}
                  height={40}
                  className="hidden dark:block"
                  style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
                />
              </>
            )}

            {item === 'vscode' && (
              <Image
                src="/images/integrations/skillgate-vscode.svg"
                alt="SkillGate VS Code Extension"
                width={40}
                height={40}
                style={{ height: '40px', width: '40px', objectFit: 'contain' }}
              />
            )}

            {item === 'codex' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Image
                  src="/images/integrations/openai-monoblossom-light.svg"
                  alt="OpenAI"
                  width={30}
                  height={30}
                  className="block dark:hidden"
                  style={{ height: '30px', width: '30px', objectFit: 'contain' }}
                />
                <Image
                  src="/images/integrations/openai-monoblossom-dark.svg"
                  alt="OpenAI"
                  width={30}
                  height={30}
                  className="hidden dark:block"
                  style={{ height: '30px', width: '30px', objectFit: 'contain' }}
                />
                <Image
                  src="/images/integrations/openai-wordmark-light.svg"
                  alt="Codex"
                  width={142}
                  height={30}
                  className="block dark:hidden"
                  style={{ height: '26px', width: 'auto', objectFit: 'contain' }}
                />
                <Image
                  src="/images/integrations/openai-wordmark-dark.svg"
                  alt="Codex"
                  width={142}
                  height={30}
                  className="hidden dark:block"
                  style={{ height: '26px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
            )}

            {item === 'mcp' && (
              <>
                <Image
                  src="/images/integrations/mcp.svg"
                  alt="MCP"
                  width={38}
                  height={38}
                  className="block dark:hidden"
                  style={{ height: '38px', width: '38px', objectFit: 'contain' }}
                />
                <Image
                  src="/images/integrations/mcp.svg"
                  alt="MCP"
                  width={38}
                  height={38}
                  className="hidden dark:block"
                  style={{
                    height: '38px',
                    width: '38px',
                    objectFit: 'contain',
                    filter: 'invert(1)',
                  }}
                />
              </>
            )}

            {item === 'github' && (
              <Image
                src="/images/integrations/github.png"
                alt="GitHub"
                width={38}
                height={38}
                style={{ height: '38px', width: '38px', objectFit: 'contain' }}
              />
            )}

            {item === 'gitlab' && (
              <Image
                src="/images/integrations/gitlab.png"
                alt="GitLab"
                width={38}
                height={38}
                style={{ height: '38px', width: '38px', objectFit: 'contain' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
