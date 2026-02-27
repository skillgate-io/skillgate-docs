'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchIndex, type SearchEntry } from '@/lib/search-index';
import { DocsAssistantConversation } from '@/components/ui/DocsAssistantConversation';
import { useDocsAssistant } from '@/components/ui/DocsAssistantContext';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  /** When true, opens directly in Ask Docs mode */
  initialMode?: 'search' | 'ask';
}

type Mode = 'search' | 'ask';

const SECTION_COLORS: Record<string, string> = {
  'Getting Started': '#22c55e',
  'CLI Reference': 'var(--accent)',
  'Detection Rules': '#f59e0b',
  'Policy': '#8b5cf6',
  'Integrations': '#06b6d4',
  'More': 'var(--text-muted)',
};

export function SearchModal({ open, onClose, initialMode = 'search' }: SearchModalProps) {
  const { resetConversation } = useDocsAssistant();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Reset on open
  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setQuery('');
      setResults([]);
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, initialMode]);

  // Search on query change
  useEffect(() => {
    const r = searchIndex(query);
    setResults(r);
    setSelected(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (mode === 'search' && e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, results.length - 1));
      } else if (mode === 'search' && e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (mode === 'search' && e.key === 'Enter' && results[selected]) {
        navigate(results[selected].href);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mode, onClose, open, results, selected]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = (href: string) => {
    router.push(href);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 101,
          width: '90%',
          maxWidth: '580px',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          overflow: 'hidden',
        }}
      >
        {/* Mode tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            padding: '6px 8px 0',
            gap: '4px',
          }}
        >
          {(['search', 'ask'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '6px 14px',
                border: 'none',
                borderBottom: mode === m ? '2px solid var(--accent)' : '2px solid transparent',
                background: 'none',
                color: mode === m ? 'var(--nav-active-text)' : 'var(--text-muted)',
                fontSize: '0.82rem',
                fontWeight: mode === m ? 600 : 400,
                cursor: 'pointer',
                transition: 'color 0.15s',
                marginBottom: '-1px',
              }}
            >
              {m === 'search' ? 'Search' : 'Ask Docs'}
            </button>
          ))}
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              paddingRight: '4px',
            }}
          >
            {mode === 'ask' && (
              <button
                onClick={resetConversation}
                aria-label="Clear chat"
                title="Clear chat"
                style={{
                  background: 'none',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  width: '26px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6" />
                  <path d="M1 20v-6h6" />
                  <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10" />
                  <path d="M20.49 15A9 9 0 0 1 6.36 18.36L1 14" />
                </svg>
              </button>
            )}
            <span
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                alignSelf: 'center',
              }}
            >
              <kbd style={{ padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--border)', background: 'var(--sidebar-bg)' }}>Esc</kbd> close
            </span>
          </div>
        </div>

        {mode === 'search' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              borderBottom: query && results.length ? '1px solid var(--border)' : 'none',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="2"
              style={{ flexShrink: 0 }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs..."
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                color: 'var(--text)',
                lineHeight: '1.5',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            <kbd
              style={{
                fontSize: '0.7rem',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                background: 'var(--sidebar-bg)',
                flexShrink: 0,
              }}
            >
              esc
            </kbd>
          </div>
        )}

        {mode === 'ask' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: 'min(72vh, 620px)' }}>
            <DocsAssistantConversation surface="modal" />
          </div>
        )}

        {/* Results (search mode only) */}
        {mode === 'search' && query && (
          <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
            {results.length === 0 ? (
              <div
                style={{
                  padding: '32px 20px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                }}
              >
                No results for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <ul style={{ margin: 0, padding: '8px', listStyle: 'none' }}>
                {results.map((entry, i) => (
                  <li key={entry.href}>
                    <button
                      onClick={() => navigate(entry.href)}
                      onMouseEnter={() => setSelected(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: selected === i ? 'var(--nav-active-bg)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.1s',
                      }}
                    >
                      {/* Section icon */}
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          background: 'var(--sidebar-bg)',
                          border: '1px solid var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '1px',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SECTION_COLORS[entry.section] ?? 'var(--text-muted)'} strokeWidth="2">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color: selected === i ? 'var(--nav-active-text)' : 'var(--text)',
                            marginBottom: '2px',
                          }}
                        >
                          {entry.title}
                        </div>
                        <div
                          style={{
                            fontSize: '0.78rem',
                            color: 'var(--text-muted)',
                            lineHeight: 1.4,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {entry.description}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          color: SECTION_COLORS[entry.section] ?? 'var(--text-muted)',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          background: 'var(--sidebar-bg)',
                          border: `1px solid ${SECTION_COLORS[entry.section] ?? 'var(--border)'}`,
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          alignSelf: 'center',
                          fontWeight: 500,
                        }}
                      >
                        {entry.section}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Footer (search mode only) */}
        {mode === 'search' && !query && (
          <div
            style={{
              padding: '20px',
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            {['Quickstart', 'scan command', 'Rule Catalog', 'Policy Reference', 'GitHub Actions'].map((label) => {
              const entry = results.find((r) => r.title === label);
              const href =
                label === 'Quickstart' ? '/quickstart' :
                label === 'scan command' ? '/cli/scan' :
                label === 'Rule Catalog' ? '/rules' :
                label === 'Policy Reference' ? '/policy' :
                '/integrations/github-actions';
              return (
                <button
                  key={label}
                  onClick={() => navigate(href)}
                  style={{
                    fontSize: '0.78rem',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: 'var(--sidebar-bg)',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Keyboard hints (search mode only) */}
        {mode === 'search' && results.length > 0 && (
          <div
            style={{
              padding: '8px 16px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '16px',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            <span><kbd style={{ padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--border)', background: 'var(--sidebar-bg)' }}>↑</kbd> <kbd style={{ padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--border)', background: 'var(--sidebar-bg)' }}>↓</kbd> navigate</span>
            <span><kbd style={{ padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--border)', background: 'var(--sidebar-bg)' }}>↵</kbd> open</span>
            <span><kbd style={{ padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--border)', background: 'var(--sidebar-bg)' }}>esc</kbd> close</span>
          </div>
        )}
      </div>
    </>
  );
}
