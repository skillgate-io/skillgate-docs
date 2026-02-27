'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
  indent?: boolean;
}

interface Props {
  items: TocItem[];
}

export function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -66% 0px', threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      <nav
        aria-label="On this page"
        className="sg-toc"
        style={{
          width: '200px',
          flexShrink: 0,
          position: 'sticky',
          top: '84px',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
          paddingBottom: '24px',
          alignSelf: 'flex-start',
        }}
      >
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '12px',
          }}
        >
          On this page
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map(({ id, label, indent }) => {
            const isActive = activeId === id;
            return (
              <li key={id} style={{ margin: '1px 0' }}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveId(id);
                  }}
                  style={{
                    display: 'block',
                    padding: '4px 0 4px 10px',
                    paddingLeft: indent ? '20px' : '10px',
                    fontSize: indent ? '0.8rem' : '0.84rem',
                    lineHeight: 1.45,
                    color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                    textDecoration: 'none',
                    borderLeft: isActive
                      ? '2px solid var(--accent)'
                      : '2px solid transparent',
                    transition: 'color 0.12s, border-color 0.12s',
                  }}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <style>{`
        @media (max-width: 1100px) { .sg-toc { display: none !important; } }
        .sg-toc::-webkit-scrollbar { width: 4px; }
        .sg-toc::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
      `}</style>
    </>
  );
}
