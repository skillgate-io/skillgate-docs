import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artifact Coverage',
  description: 'What SkillGate scans beyond source code: markdown, configs, documents, and archives.',
};

export default function ArtifactsPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Runtime</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Artifact Coverage
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          SkillGate scans source code and supporting files so teams can review risk in one place.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Supported artifact types</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Type', 'Origin tag', 'Notes'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Source directories', 'code', 'Python, JS, TS, Shell, Go, Rust, Ruby.'],
              ['ZIP archives', 'archive_member', 'Traversal bounded by depth and extraction budget.'],
              ['PDF documents', 'document_text', 'Text-only extraction, fenced code blocks included.'],
              ['DOCX documents', 'document_text', 'Text-only extraction.'],
              ['Markdown prose', 'markdown', 'Prose and fenced code blocks.'],
              ['Config files', 'config', 'JSON, YAML, TOML, ENV files.'],
            ].map(([type, tag, notes]) => (
              <tr key={type} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontWeight: 500, color: 'var(--text)' }}>{type}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)' }}>{tag}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>How findings are organized</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 2.2, paddingLeft: '20px', marginBottom: '32px' }}>
        {[
          'Findings are grouped by file type so reviewers can triage quickly.',
          'Policies can apply stricter thresholds for specific content types.',
          'JSON and SARIF outputs preserve file context for audits and CI review.',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ul>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Safety and performance controls</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 2.2, paddingLeft: '20px', marginBottom: '32px' }}>
        {[
          'Archive scanning is limited for safe and predictable performance.',
          'Files larger than 100 KB are skipped with an explicit warning.',
          'Text is normalized before scanning for more reliable matching.',
          'No code is executed during scanning. Analysis is purely static.',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ul>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Policy example</h2>
      <div style={{ background: 'var(--code-bg)', borderRadius: '8px', padding: '16px 20px', fontFamily: 'monospace', fontSize: '0.83rem', color: '#e5e7eb', overflow: 'auto', marginBottom: '24px' }}>
        <pre style={{ margin: 0 }}>{`version: "1"
preset: production

per_origin:
  document_text:
    min_severity: medium
    blocked_categories: [credentials]
  archive_member:
    min_severity: high
    blocked_categories: [credentials, network]`}</pre>
      </div>
    </div>
  );
}
