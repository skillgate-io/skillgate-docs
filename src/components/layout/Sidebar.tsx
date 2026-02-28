'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/nav';
import { SearchTrigger } from '@/components/ui/SearchTrigger';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{
            display: 'none',
            position: 'fixed',
            inset: 0,
            zIndex: 30,
            background: 'rgba(0,0,0,0.5)',
          }}
          className="sidebar-backdrop"
        />
      )}

      <aside
        style={{
          width: '260px',
          minWidth: '260px',
          height: 'calc(100vh - 56px)',
          position: 'sticky',
          top: '56px',
          overflowY: 'auto',
          borderRight: '1px solid var(--border)',
          background: 'var(--sidebar-bg)',
          padding: '24px 0 40px',
          flexShrink: 0,
        }}
        className={`sidebar ${open ? 'sidebar-open' : ''}`}
      >
        {/* Search trigger - sits at top of sidebar */}
        <div style={{ padding: '0 12px 8px' }}>
          <SearchTrigger />
        </div>

        {NAV.map((section) => (
          <div key={section.title} style={{ marginBottom: '24px' }}>
            <div
              style={{
                padding: '4px 20px 8px',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
              }}
            >
              {section.title}
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '5px 20px',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        color: active ? 'var(--nav-active-text)' : 'var(--text-muted)',
                        background: active ? 'var(--nav-active-bg)' : 'transparent',
                        borderLeft: active
                          ? '2px solid var(--nav-active-border)'
                          : '2px solid transparent',
                        fontWeight: active ? 500 : 400,
                        transition: 'all 0.1s',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color = 'var(--text)';
                          (e.currentTarget as HTMLElement).style.borderLeftColor = 'var(--border)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                          (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
                        }
                      }}
                    >
                      {item.label}
                      {item.badge && (
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            padding: '1px 5px',
                            borderRadius: '4px',
                            background: 'var(--accent)',
                            color: '#fff',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            position: fixed !important;
            top: 56px !important;
            left: -260px;
            z-index: 40;
            transition: transform 0.25s ease;
            height: calc(100vh - 56px) !important;
          }
          .sidebar.sidebar-open {
            transform: translateX(260px);
          }
          .sidebar-backdrop {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
