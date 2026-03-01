'use client';

import { useEffect, useRef, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { HeadingAnchors } from '@/components/ui/HeadingAnchors';
import { AutoTableOfContents } from '@/components/ui/AutoTableOfContents';
import { DocsAssistant } from '@/components/ui/DocsAssistant';
import { DocsAssistantProvider, useDocsAssistant } from '@/components/ui/DocsAssistantContext';
import { SearchModal } from '@/components/ui/SearchModal';
import { SearchModalProvider, useSearchModal } from '@/components/ui/SearchModalContext';

export function DocLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DocsAssistantProvider>
      <SearchModalProvider>
        <DocLayoutInner sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          {children}
        </DocLayoutInner>
      </SearchModalProvider>
    </DocsAssistantProvider>
  );
}

function DocLayoutInner({
  children,
  sidebarOpen,
  setSidebarOpen,
}: {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isOpen, mode, close } = useSearchModal();
  const { markPanelOpened, markPanelClosed } = useDocsAssistant();
  const didInitRef = useRef(false);

  useEffect(() => {
    if (!didInitRef.current) {
      didInitRef.current = true;
      return;
    }
    if (isOpen) markPanelOpened();
    else markPanelClosed();
  }, [isOpen, markPanelOpened, markPanelClosed]);

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
          <div style={{ display: 'flex', gap: '56px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
            <AutoTableOfContents />
          </div>
        </main>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .doc-main {
            padding: 24px 20px 120px !important;
          }
        }
      `}</style>
      <DocsAssistant />
      <SearchModal open={isOpen} onClose={close} initialMode={mode} />
    </div>
  );
}
