'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { ChatCitation, ChatMessage } from '@/types/chat';
import { useDocsAssistant } from '@/components/ui/DocsAssistantContext';

interface DocsAssistantConversationProps {
  surface: 'drawer' | 'modal';
}

export function DocsAssistantConversation({ surface }: DocsAssistantConversationProps) {
  const { messages, isStreaming, sendMessage } = useDocsAssistant();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isEmpty = messages.length === 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const placeholder = useMemo(
    () => 'Ask about SkillGate commands, policies, integrations...',
    [],
  );

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput('');
    await sendMessage(text);
  };

  return (
    <>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: surface === 'modal' ? '12px 14px' : '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
        aria-live="polite"
        aria-relevant="additions"
      >
        {isEmpty ? <InitialState onPrompt={sendMessage} /> : messages.map((message) => <MessageBubble key={message.id} message={message} />)}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: surface === 'modal' ? '10px 12px' : '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-end',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '8px 12px',
            background: 'var(--sidebar-bg)',
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void handleSend();
              }
            }}
            placeholder={placeholder}
            disabled={isStreaming}
            rows={1}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: '0.875rem',
              color: 'var(--text)',
              lineHeight: '1.5',
              maxHeight: '120px',
              overflowY: 'auto',
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => void handleSend()}
            disabled={!input.trim() || isStreaming}
            aria-label="Send message"
            style={{
              background: input.trim() && !isStreaming ? 'var(--accent)' : 'var(--border)',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 8px',
              cursor: input.trim() && !isStreaming ? 'pointer' : 'default',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
}

function InitialState({ onPrompt }: { onPrompt: (text: string) => Promise<void> }) {
  const prompts = [
    'How do I get started with SkillGate in my repository?',
    'How can SkillGate help secure Claude Code or Codex CLI usage?',
    'Which integration should I use for GitHub Actions, GitLab CI, or VS Code?',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '8px' }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
        Answers are grounded only in SkillGate docs.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => void onPrompt(prompt)}
            style={{
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--sidebar-bg)',
              color: 'var(--text)',
              fontSize: '0.82rem',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap: '8px' }}>
      <div
        style={{
          maxWidth: '92%',
          padding: '10px 14px',
          borderRadius: isUser ? '14px 14px 4px 14px' : '4px 14px 14px 14px',
          background: isUser ? 'var(--accent)' : 'var(--sidebar-bg)',
          color: isUser ? '#fff' : 'var(--text)',
          fontSize: '0.875rem',
          lineHeight: 1.55,
          border: isUser ? 'none' : '1px solid var(--border)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {message.content || (message.isStreaming ? <StreamingStatus /> : null)}
        {message.isStreaming && message.content && (
          <span style={{ display: 'inline-flex', marginLeft: '8px', verticalAlign: 'middle' }}>
            <StreamingDot />
          </span>
        )}
      </div>

      {!isUser && !message.isStreaming && message.outcome && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingLeft: '4px' }}>
          <SafetyChip>Injection screened</SafetyChip>
          <SafetyChip>Output policy checked</SafetyChip>
          {message.trust && message.trust.groundingCount < 2 && <SafetyChip warn>Low evidence</SafetyChip>}
        </div>
      )}

      {!isUser && message.outcome === 'answered' && message.citations && message.citations.length > 0 && (
        <CitationsSection citations={message.citations} trust={message.trust} />
      )}

      {!isUser && (message.outcome === 'refused' || message.outcome === 'blocked') && !message.isStreaming && (
        <RefusalFollowUps />
      )}
    </div>
  );
}

function CitationsSection({ citations, trust }: { citations: ChatCitation[]; trust?: ChatMessage['trust'] }) {
  return (
    <div style={{ width: '100%', paddingLeft: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
        Sources
        {trust && (
          <span style={{ marginLeft: '8px', fontWeight: 400, textTransform: 'none' }}>
            Grounding: {trust.groundingCount} source{trust.groundingCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      {citations.map((citation) => (
        <CitationCard key={citation.url + (citation.anchor ?? '')} citation={citation} />
      ))}
    </div>
  );
}

function CitationCard({ citation }: { citation: ChatCitation }) {
  const href = citation.anchor ? `${citation.url}#${citation.anchor}` : citation.url;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={citation.snippet}
      style={{
        display: 'block',
        padding: '8px 10px',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        background: 'var(--bg)',
        textDecoration: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text)',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {citation.title}
        </span>
        <RelevanceBadge relevance={citation.relevance} />
      </div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {citation.url} · {citation.indexedAt}
      </div>
    </a>
  );
}

function RefusalFollowUps() {
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingLeft: '4px' }}>
      <a href="/quickstart" style={refusalLinkStyle}>Search docs instead</a>
      <a href="/cli" style={refusalLinkStyle}>See supported topics</a>
    </div>
  );
}

const refusalLinkStyle: CSSProperties = {
  fontSize: '0.75rem',
  padding: '4px 10px',
  borderRadius: '6px',
  border: '1px solid var(--border)',
  color: 'var(--text-muted)',
  textDecoration: 'none',
};

function SafetyChip({ children, warn = false }: { children: ReactNode; warn?: boolean }) {
  return (
    <span
      style={{
        fontSize: '0.65rem',
        padding: '2px 7px',
        borderRadius: '4px',
        border: `1px solid ${warn ? 'var(--callout-warning-border)' : 'var(--border)'}`,
        color: warn ? 'var(--callout-warning-border)' : 'var(--text-muted)',
        background: warn ? 'var(--callout-warning-bg)' : 'var(--sidebar-bg)',
      }}
    >
      {children}
    </span>
  );
}

function RelevanceBadge({ relevance }: { relevance: 'high' | 'medium' | 'low' }) {
  const color = relevance === 'high' ? 'var(--accent)' : relevance === 'medium' ? '#f59e0b' : 'var(--text-muted)';
  return (
    <span
      style={{
        fontSize: '0.62rem',
        padding: '1px 5px',
        borderRadius: '3px',
        border: `1px solid ${color}`,
        color,
        textTransform: 'capitalize',
      }}
    >
      {relevance}
    </span>
  );
}

function StreamingDot() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'currentColor',
        marginLeft: '4px',
        verticalAlign: 'middle',
        animation: 'sg-blink 1s step-start infinite',
      }}
    >
      <style>{`@keyframes sg-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }`}</style>
    </span>
  );
}

function StreamingStatus() {
  const statuses = [
    'Analyzing SkillGate docs',
    'Cross-checking policy guidance',
    'Matching integration references',
    'Preparing cited answer',
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % statuses.length);
    }, 1200);
    return () => window.clearInterval(timer);
  }, [statuses.length]);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        color: 'var(--text-muted)',
      }}
    >
      <span>{statuses[index]}</span>
      <StreamingDot />
    </span>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
