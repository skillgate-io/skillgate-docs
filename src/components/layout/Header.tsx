'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function ShieldLogo() {
  return (
    <svg
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '22px', height: '25px', flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hdr-sg-stroke" x1="32" y1="2" x2="32" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="hdr-sg-lock" x1="32" y1="22" x2="32" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#6ee7b7" />
        </linearGradient>
      </defs>
      <path
        d="M32 3L59 14V36C59 52 32 69 32 69C32 69 5 52 5 36V14L32 3Z"
        stroke="url(#hdr-sg-stroke)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M26.5 33.5V28C26.5 23 37.5 23 37.5 28V33.5"
        stroke="url(#hdr-sg-lock)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="22.5" y="33" width="19" height="13" rx="2.5" fill="url(#hdr-sg-lock)" opacity="0.85" />
      <circle cx="32" cy="38.5" r="2.2" fill="currentColor" />
      <rect x="30.8" y="38.5" width="2.4" height="3.5" rx="1.2" fill="currentColor" />
    </svg>
  );
}

export function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          aria-label="Toggle navigation"
          style={{
            display: 'none',
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
          }}
          className="mobile-menu-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: 'var(--text)',
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '-0.01em',
          }}
        >
          <ShieldLogo />
          <span>SkillGate</span>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              padding: '1px 6px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
            }}
          >
            Docs
          </span>
        </Link>

        <div style={{ flex: 1 }} />

        {/* Nav actions */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href="https://skillgate.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              padding: '5px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
            }}
          >
            skillgate.io
          </a>

          <a
            href="https://github.com/skillgate-io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '6px',
              color: 'var(--text-muted)',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px',
                borderRadius: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
          )}
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
