type CalloutVariant = 'info' | 'warning' | 'tip' | 'danger';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

const ICONS: Record<CalloutVariant, React.ReactNode> = {
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  tip: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
    </svg>
  ),
  danger: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

const DEFAULT_TITLES: Record<CalloutVariant, string> = {
  info: 'Note',
  warning: 'Warning',
  tip: 'Tip',
  danger: 'Caution',
};

export function Callout({ variant = 'info', title, children }: CalloutProps) {
  const styles = {
    info: { bg: 'var(--callout-info-bg)', border: 'var(--callout-info-border)', color: '#1d4ed8' },
    warning: { bg: 'var(--callout-warning-bg)', border: 'var(--callout-warning-border)', color: '#b45309' },
    tip: { bg: 'var(--callout-tip-bg)', border: 'var(--callout-tip-border)', color: '#15803d' },
    danger: { bg: 'var(--callout-danger-bg)', border: 'var(--callout-danger-border)', color: '#b91c1c' },
  };

  const s = styles[variant];

  return (
    <div
      style={{
        background: s.bg,
        borderLeft: `3px solid ${s.border}`,
        borderRadius: '0 8px 8px 0',
        padding: '12px 16px',
        marginBottom: '20px',
        fontSize: '0.9rem',
        color: 'var(--text)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', color: s.color }}>
        {ICONS[variant]}
        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{title ?? DEFAULT_TITLES[variant]}</span>
      </div>
      <div style={{ marginTop: '4px', lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}
