'use client';

import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { HeadingAnchors } from '@/components/ui/HeadingAnchors';

export function DocLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Header onMenuToggle={() => setSidebarOpen((o) => !o)} />
      <div
        style={{
          display: 'flex',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: '40px 48px 80px',
          }}
          data-docs-content="true"
          className="doc-main"
        >
          <HeadingAnchors />
          {children}
        </main>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .doc-main {
            padding: 24px 20px 60px !important;
          }
        }
      `}</style>
    </div>
  );
}
