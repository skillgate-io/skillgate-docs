'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import type { ChatMessage, ChatResponseStyle, ChatSSEEvent, ConversationTurn } from '@/types/chat';

interface State {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
}

type Action =
  | { type: 'USER_MESSAGE'; message: ChatMessage }
  | { type: 'STREAM_START'; id: string }
  | { type: 'STREAM_TOKEN'; id: string; text: string }
  | { type: 'STREAM_DONE'; id: string; partial: Partial<ChatMessage> }
  | { type: 'STREAM_ERROR'; id: string; error: string }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'USER_MESSAGE':
      return { ...state, messages: [...state.messages, action.message], error: null };
    case 'STREAM_START':
      return {
        ...state,
        isStreaming: true,
        messages: [
          ...state.messages,
          {
            id: action.id,
            role: 'assistant',
            content: '',
            timestamp: Date.now(),
            isStreaming: true,
          },
        ],
      };
    case 'STREAM_TOKEN':
      return {
        ...state,
        messages: state.messages.map((m) => (m.id === action.id ? { ...m, content: m.content + action.text } : m)),
      };
    case 'STREAM_DONE':
      return {
        ...state,
        isStreaming: false,
        messages: state.messages.map((m) => (m.id === action.id ? { ...m, ...action.partial, isStreaming: false } : m)),
      };
    case 'STREAM_ERROR':
      return {
        ...state,
        isStreaming: false,
        error: action.error,
        messages: state.messages.map((m) =>
          m.id === action.id ? { ...m, content: action.error, isStreaming: false, outcome: 'error' } : m,
        ),
      };
    case 'RESET':
      return { messages: [], isStreaming: false, error: null };
  }
}

const INITIAL_STATE: State = { messages: [], isStreaming: false, error: null };
const RESUME_WINDOW_MS = 15 * 60 * 1000;
const EXAMPLE_HINTS = /\b(example|sample|snippet|template|show me|code)\b/i;
const STEPS_HINTS = /\b(how (do|to)|steps?|walk me through|setup|configure|install|integrate|migration)\b/i;

interface DocsAssistantContextValue extends State {
  conversationId: string;
  sendMessage: (text: string, style?: ChatResponseStyle) => Promise<void>;
  resetConversation: () => void;
  markPanelOpened: () => void;
  markPanelClosed: () => void;
}

const DocsAssistantContext = createContext<DocsAssistantContextValue | null>(null);

export function DocsAssistantProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [conversationId] = useState(() => (typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36)));
  const abortRef = useRef<AbortController | null>(null);
  const clearTimerRef = useRef<number | null>(null);

  const sendMessage = useCallback(async (text: string, style?: ChatResponseStyle) => {
    if (!text.trim() || state.isStreaming) return;
    const trimmedText = text.trim();
    const resolvedStyle = style ?? inferResponseStyle(trimmedText);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedText,
      timestamp: Date.now(),
    };
    dispatch({ type: 'USER_MESSAGE', message: userMessage });

    const assistantId = crypto.randomUUID();
    dispatch({ type: 'STREAM_START', id: assistantId });

    const history: ConversationTurn[] = state.messages
      .filter((m) => !m.isStreaming)
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.content }));

    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abort.signal,
        body: JSON.stringify({
          message: trimmedText,
          mode: 'docs_only',
          surface: 'docs',
          conversationId,
          history,
          responseStyle: resolvedStyle,
        }),
      });

      if (!res.ok || !res.body) {
        dispatch({ type: 'STREAM_ERROR', id: assistantId, error: 'Assistant is temporarily unavailable. Use Search while we recover.' });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const event = JSON.parse(line.slice(6)) as ChatSSEEvent;
            if (event.type === 'token') {
              dispatch({ type: 'STREAM_TOKEN', id: assistantId, text: event.content });
            } else if (event.type === 'done') {
              dispatch({
                type: 'STREAM_DONE',
                id: assistantId,
                partial: {
                  content: event.answer,
                  citations: event.citations,
                  trust: event.trust,
                  outcome: event.outcome,
                  refusalReason: event.refusalReason,
                },
              });
            } else if (event.type === 'error') {
              dispatch({ type: 'STREAM_ERROR', id: assistantId, error: event.error });
            }
          } catch {
            // Ignore malformed lines.
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      dispatch({ type: 'STREAM_ERROR', id: assistantId, error: 'Assistant is temporarily unavailable. Use Search while we recover.' });
    }
  }, [conversationId, state.isStreaming, state.messages]);

  const resetConversation = useCallback(() => {
    abortRef.current?.abort();
    dispatch({ type: 'RESET' });
  }, []);

  const markPanelOpened = useCallback(() => {
    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
  }, []);

  const markPanelClosed = useCallback(() => {
    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current);
    }
    clearTimerRef.current = window.setTimeout(() => {
      dispatch({ type: 'RESET' });
      clearTimerRef.current = null;
    }, RESUME_WINDOW_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }
    };
  }, []);

  const value = useMemo<DocsAssistantContextValue>(
    () => ({ ...state, conversationId, sendMessage, resetConversation, markPanelOpened, markPanelClosed }),
    [conversationId, markPanelClosed, markPanelOpened, resetConversation, sendMessage, state],
  );

  return <DocsAssistantContext.Provider value={value}>{children}</DocsAssistantContext.Provider>;
}

function inferResponseStyle(text: string): ChatResponseStyle {
  if (EXAMPLE_HINTS.test(text)) return 'example';
  if (STEPS_HINTS.test(text)) return 'steps';
  return 'concise';
}

export function useDocsAssistant(): DocsAssistantContextValue {
  const ctx = useContext(DocsAssistantContext);
  if (!ctx) {
    throw new Error('useDocsAssistant must be used within DocsAssistantProvider');
  }
  return ctx;
}
