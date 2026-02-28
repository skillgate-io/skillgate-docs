// Multi-provider LLM adapter for the SkillGate Docs Assistant.
// Supports: Anthropic (claude-sonnet-4-6), OpenAI (gpt-4o), Groq (llama-3.3-70b-versatile),
// Ollama (llama3.2 via local server). Provider selected via SKILLGATE_LLM_PROVIDER env var.
// OpenAI SDK handles OpenAI, Groq, and Ollama - all are OpenAI-compatible APIs.

export type LLMProvider = 'anthropic' | 'openai' | 'groq' | 'ollama';

export interface LLMMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface StreamToken {
  text: string;
}

export interface LLMStreamResult {
  tokens: AsyncIterable<StreamToken>;
  provider: LLMProvider;
  model: string;
}

/** Default model IDs per provider. Override with SKILLGATE_LLM_MODEL env var. */
const DEFAULT_MODELS: Record<LLMProvider, string> = {
  anthropic: 'claude-sonnet-4-6',
  openai: 'gpt-4o',
  groq: 'llama-3.3-70b-versatile',
  ollama: 'llama3.2',
};

/**
 * Resolve the active provider. Falls back through providers in order:
 * explicit env → anthropic (if key set) → openai (if key set) → groq (if key set) → ollama.
 */
export function resolveProvider(): LLMProvider {
  const explicit = process.env.SKILLGATE_LLM_PROVIDER as LLMProvider | undefined;
  if (explicit && DEFAULT_MODELS[explicit]) return explicit;

  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.GROQ_API_KEY) return 'groq';
  return 'ollama'; // localhost fallback
}

/** Resolve the model to use for a given provider. */
export function resolveModel(provider: LLMProvider): string {
  return process.env.SKILLGATE_LLM_MODEL ?? DEFAULT_MODELS[provider];
}

/**
 * Stream a chat completion from the active LLM provider.
 * Yields text tokens as they arrive, then completes.
 *
 * @throws {LLMProviderError} when credentials are missing or the API call fails.
 */
export async function streamCompletion(
  systemPrompt: string,
  messages: LLMMessage[],
): Promise<LLMStreamResult> {
  const provider = resolveProvider();
  const model = resolveModel(provider);

  const tokens = provider === 'anthropic'
    ? streamAnthropic(systemPrompt, messages, model)
    : streamOpenAICompat(provider, systemPrompt, messages, model);

  return { tokens, provider, model };
}

// ─── Anthropic ─────────────────────────────────────────────────────────────

async function* streamAnthropic(
  systemPrompt: string,
  messages: LLMMessage[],
  model: string,
): AsyncIterable<StreamToken> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new LLMProviderError('anthropic', 'ANTHROPIC_API_KEY is not set');

  // Dynamic import keeps the bundle lean when not using Anthropic
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey });

  const stream = client.messages.stream({
    model,
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta' &&
      event.delta.text
    ) {
      yield { text: event.delta.text };
    }
  }
}

// ─── OpenAI-compatible (OpenAI / Groq / Ollama) ────────────────────────────

async function* streamOpenAICompat(
  provider: LLMProvider,
  systemPrompt: string,
  messages: LLMMessage[],
  model: string,
): AsyncIterable<StreamToken> {
  const { baseURL, apiKey } = resolveOpenAICompatConfig(provider);

  const { default: OpenAI } = await import('openai');
  const client = new OpenAI({ apiKey, baseURL });

  const stream = await client.chat.completions.create({
    model,
    stream: true,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    ],
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield { text: delta };
  }
}

function resolveOpenAICompatConfig(provider: LLMProvider): {
  baseURL: string | undefined;
  apiKey: string;
} {
  switch (provider) {
    case 'openai': {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new LLMProviderError('openai', 'OPENAI_API_KEY is not set');
      return { baseURL: undefined, apiKey };
    }
    case 'groq': {
      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) throw new LLMProviderError('groq', 'GROQ_API_KEY is not set');
      return { baseURL: 'https://api.groq.com/openai/v1', apiKey };
    }
    case 'ollama': {
      const baseURL = process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434/v1';
      return { baseURL, apiKey: 'ollama' }; // Ollama accepts any non-empty key
    }
    default:
      throw new LLMProviderError(provider as string, 'Unknown provider');
  }
}

// ─── Error ─────────────────────────────────────────────────────────────────

export class LLMProviderError extends Error {
  constructor(
    public readonly provider: string,
    message: string,
  ) {
    super(`[${provider}] ${message}`);
    this.name = 'LLMProviderError';
  }
}
