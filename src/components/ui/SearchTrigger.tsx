'use client';

import { useEffect, useState } from 'react';
import { SearchModal } from './SearchModal';

export function SearchTrigger() {
  const [open, setOpen] = useState(false);

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search docs"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          padding: '7px 12px',
          margin: '0 0 16px',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: 'var(--bg)',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
          textAlign: 'left',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span style={{ flex: 1 }}>Search docs</span>
        <kbd
          style={{
            fontSize: '0.65rem',
            padding: '1px 5px',
            borderRadius: '4px',
            border: '1px solid var(--border)',
            background: 'var(--sidebar-bg)',
            color: 'var(--text-muted)',
            lineHeight: '1.4',
          }}
        >
          ⌘K
        </kbd>
      </button>

      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
