'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function HeadingAnchors() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('main[data-docs-content="true"]');
    if (!root) return;

    const usedIds = new Set<string>();
    root.querySelectorAll<HTMLElement>('[id]').forEach((node) => {
      if (node.id) usedIds.add(node.id);
    });

    const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4'));

    for (const heading of headings) {
      if (heading.querySelector('.sg-heading-anchor')) {
        continue;
      }

      const rawText = heading.textContent?.trim() || '';
      if (!rawText) continue;

      let baseId = heading.id || slugify(rawText);
      if (!baseId) continue;

      let uniqueId = baseId;
      let i = 2;
      while (usedIds.has(uniqueId) && heading.id !== uniqueId) {
        uniqueId = `${baseId}-${i}`;
        i += 1;
      }

      if (!heading.id) {
        heading.id = uniqueId;
      }
      usedIds.add(heading.id);

      const anchor = document.createElement('a');
      anchor.href = `#${heading.id}`;
      anchor.className = 'sg-heading-anchor';
      anchor.setAttribute('aria-label', `Copy link to section: ${rawText}`);
      anchor.setAttribute('title', 'Copy section link');
      anchor.textContent = '#';
      heading.appendChild(anchor);
    }
  }, [pathname]);

  return null;
}