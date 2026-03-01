'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TableOfContents, type TocItem } from './TableOfContents';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function AutoTableOfContents() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [hasStaticToc, setHasStaticToc] = useState(false);
  const enabledForPath = useMemo(() => {
    return (
      pathname.startsWith('/cli') ||
      pathname.startsWith('/rules') ||
      pathname.startsWith('/enterprise') ||
      pathname.startsWith('/use-cases') ||
      pathname === '/runtime-control' ||
      pathname === '/agent-gateway' ||
      pathname === '/artifacts' ||
      pathname === '/intelligence' ||
      pathname === '/control-plane' ||
      pathname === '/observability'
    );
  }, [pathname]);

  useEffect(() => {
    if (!enabledForPath) {
      setHasStaticToc(false);
      setItems([]);
      return;
    }

    const root = document.querySelector('[data-docs-content="true"]');
    if (!root) return;

    const staticToc = root.querySelector('.sg-static-toc');
    setHasStaticToc(Boolean(staticToc));
    if (staticToc) {
      setItems([]);
      return;
    }

    const headings = Array.from(root.querySelectorAll('.sg-prose h2, .sg-prose h3')) as HTMLElement[];
    const seen = new Set<string>();

    const tocItems = headings
      .map((heading) => {
        const text = (heading.textContent ?? '').replace(/\s*#\s*$/, '').trim();
        if (!text) return null;

        let id = heading.id;
        if (!id) {
          const base = slugify(text);
          if (!base) return null;
          let candidate = base;
          let idx = 2;
          while (seen.has(candidate) || document.getElementById(candidate)) {
            candidate = `${base}-${idx}`;
            idx += 1;
          }
          heading.id = candidate;
          id = candidate;
        }
        seen.add(id);

        const item: TocItem = {
          id,
          label: text,
          indent: heading.tagName.toLowerCase() === 'h3',
        };
        return item;
      })
      .filter((item): item is TocItem => item !== null);

    setItems(tocItems);
  }, [enabledForPath, pathname]);

  const visibleItems = useMemo(() => (items.length >= 2 ? items : []), [items]);
  if (!enabledForPath) return null;
  if (hasStaticToc) return null;
  if (visibleItems.length === 0) return null;

  return <TableOfContents items={visibleItems} className="sg-auto-toc" />;
}
