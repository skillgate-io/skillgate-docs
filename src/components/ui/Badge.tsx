type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
type Status = 'stable' | 'beta' | 'planned' | 'deprecated';

interface BadgeProps {
  severity?: Severity;
  status?: Status;
  label?: string;
}

const SEVERITY_STYLES: Record<Severity, { bg: string; text: string; border: string }> = {
  LOW: { bg: '#f3f4f6', text: '#6b7280', border: '#d1d5db' },
  MEDIUM: { bg: '#fffbeb', text: '#d97706', border: '#fcd34d' },
  HIGH: { bg: '#fff7ed', text: '#ea580c', border: '#fdba74' },
  CRITICAL: { bg: '#fef2f2', text: '#dc2626', border: '#fca5a5' },
};

const STATUS_STYLES: Record<Status, { bg: string; text: string; border: string }> = {
  stable: { bg: '#f0fdf4', text: '#16a34a', border: '#86efac' },
  beta: { bg: '#eff6ff', text: '#2563eb', border: '#93c5fd' },
  planned: { bg: '#f5f3ff', text: '#7c3aed', border: '#c4b5fd' },
  deprecated: { bg: '#f9fafb', text: '#9ca3af', border: '#e5e7eb' },
};

export function Badge({ severity, status, label }: BadgeProps) {
  const style =
    severity
      ? SEVERITY_STYLES[severity]
      : status
        ? STATUS_STYLES[status]
        : { bg: '#f3f4f6', text: '#6b7280', border: '#d1d5db' };

  const text = label ?? severity ?? status ?? '';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1px 7px',
        borderRadius: '4px',
        fontSize: '0.7rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        background: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
}
