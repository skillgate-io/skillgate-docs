'use client';

import { useSearchModal } from '@/components/ui/SearchModalContext';

export function DocsAssistant() {
  const { openAsk } = useSearchModal();

  return (
    <button
      onClick={openAsk}
      aria-label="Ask SkillGate Docs"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '24px',
        background: 'var(--accent)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: 600,
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
      }}
    >
      <ChatIcon />
      <span>Ask Docs</span>
    </button>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
