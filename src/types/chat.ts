// Chat API types shared between server (API route) and client (components)

export type ChatOutcome = 'answered' | 'refused' | 'blocked' | 'error';
export type ChatSurface = 'docs' | 'web_ui';
export type ChatResponseStyle = 'concise' | 'steps' | 'example';

export type RefusalReason =
  | 'no_relevant_docs'
  | 'off_topic'
  | 'prompt_injection'
  | 'jailbreak_attempt'
  | 'data_exfiltration'
  | 'unsafe_request'
  | 'hallucination_trap'
  | 'rate_limited';

export interface ChatCitation {
  title: string;
  url: string;
  anchor?: string;
  snippet: string;
  score: number;
  indexedAt: string;
  relevance: 'high' | 'medium' | 'low';
}

export interface ChatTrust {
  groundingCount: number;
  chunkCount: number;
  policyChecks: string[];
}

export interface ConversationTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  mode: 'docs_only';
  surface: ChatSurface;
  conversationId: string;
  history?: ConversationTurn[];
  responseStyle?: ChatResponseStyle;
}

// SSE events streamed from the API
export type ChatSSEEvent =
  | { type: 'token'; content: string }
  | {
      type: 'done';
      answer: string;
      citations: ChatCitation[];
      trust: ChatTrust;
      outcome: ChatOutcome;
      refusalReason?: RefusalReason;
    }
  | { type: 'error'; error: string; outcome: 'error' };

// Client-side message model
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: ChatCitation[];
  trust?: ChatTrust;
  outcome?: ChatOutcome;
  refusalReason?: RefusalReason;
  timestamp: number;
  isStreaming?: boolean;
}
