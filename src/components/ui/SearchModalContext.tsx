'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type SearchMode = 'search' | 'ask';

interface SearchModalContextValue {
  isOpen: boolean;
  mode: SearchMode;
  openSearch: () => void;
  openAsk: () => void;
  close: () => void;
}

const SearchModalContext = createContext<SearchModalContextValue | null>(null);

export function SearchModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<SearchMode>('search');

  const openSearch = useCallback(() => {
    setMode('search');
    setIsOpen(true);
  }, []);

  const openAsk = useCallback(() => {
    setMode('ask');
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<SearchModalContextValue>(
    () => ({ isOpen, mode, openSearch, openAsk, close }),
    [isOpen, mode, openSearch, openAsk, close],
  );

  return <SearchModalContext.Provider value={value}>{children}</SearchModalContext.Provider>;
}

export function useSearchModal(): SearchModalContextValue {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error('useSearchModal must be used within SearchModalProvider');
  }
  return context;
}
