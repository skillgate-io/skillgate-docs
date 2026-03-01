import { TableOfContents, TocItem } from './TableOfContents';

interface Props {
  items: TocItem[];
  children: React.ReactNode;
}

export function PageWithTOC({ items, children }: Props) {
  return (
    <div style={{ display: 'flex', gap: '56px', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      <TableOfContents items={items} className="sg-static-toc" />
    </div>
  );
}
