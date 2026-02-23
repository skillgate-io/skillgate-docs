'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'bash', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      style={{
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid #2d2d3d',
        marginBottom: '20px',
        fontSize: '0.875rem',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: '#16161f',
          borderBottom: '1px solid #2d2d3d',
        }}
      >
        <span style={{ color: '#6b7280', fontSize: '0.75rem', fontFamily: 'monospace' }}>
          {filename ?? language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            background: 'none',
            border: '1px solid #2d2d3d',
            borderRadius: '4px',
            color: copied ? '#22c55e' : '#9ca3af',
            fontSize: '0.7rem',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: '#1e1e2e',
          padding: '16px',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
        wrapLines
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
