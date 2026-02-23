import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'GitHub Actions Integration',
  description: 'Gate GitHub CI pipelines with SkillGate. Upload SARIF results to the Security tab.',
};

export default function GitHubActionsPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Integrations</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          GitHub Actions
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Add SkillGate to your GitHub Actions workflow to block merges on policy violations and surface findings in the Security tab.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Basic workflow</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.9rem' }}>
        Add this step to your existing workflow, or create a new file at <code>.github/workflows/skillgate.yml</code>:
      </p>
      <CodeBlock
        language="yaml"
        filename=".github/workflows/skillgate.yml"
        code={`name: SkillGate Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  scan:
    name: Scan skills
    runs-on: ubuntu-latest
    permissions:
      security-events: write  # required for SARIF upload

    steps:
      - uses: actions/checkout@v4

      - name: Install SkillGate
        run: pipx install skillgate

      - name: Run scan
        env:
          SKILLGATE_API_KEY: \${{ secrets.SKILLGATE_API_KEY }}
        run: |
          skillgate scan ./skills \\
            --enforce \\
            --policy production \\
            --output sarif \\
            --report-file results.sarif

      - name: Upload SARIF results
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: results.sarif`}
      />

      <Callout variant="info" title="SKILLGATE_API_KEY secret">
        Add your API key as a repository secret under Settings &gt; Secrets and variables &gt; Actions. Name it <code>SKILLGATE_API_KEY</code>.
      </Callout>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Blocking pull requests</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.9rem', lineHeight: 1.7 }}>
        With <code>--enforce</code>, SkillGate exits with code 1 on any violation. GitHub Actions treats non-zero exit codes as failures, so the job will fail and block the merge (if branch protection requires the check to pass).
      </p>
      <p style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.9rem', lineHeight: 1.7 }}>
        To enforce blocking: go to your repository&apos;s Settings &gt; Branches &gt; Branch protection rules, and add the SkillGate check as a required status check.
      </p>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Matrix scan (multiple skill directories)</h2>
      <CodeBlock
        language="yaml"
        filename=".github/workflows/skillgate.yml"
        code={`jobs:
  scan:
    strategy:
      matrix:
        skill: [skills/skill-a, skills/skill-b, skills/skill-c]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pipx install skillgate
      - name: Scan \${{ matrix.skill }}
        env:
          SKILLGATE_API_KEY: \${{ secrets.SKILLGATE_API_KEY }}
        run: skillgate scan \${{ matrix.skill }} --enforce --policy production`}
      />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Caching SkillGate</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.9rem' }}>
        Speed up workflows by caching the pipx-installed binary:
      </p>
      <CodeBlock
        language="yaml"
        code={`- name: Cache pipx
  uses: actions/cache@v4
  with:
    path: ~/.local/pipx
    key: pipx-skillgate-\${{ runner.os }}-1.0.0

- name: Install SkillGate
  run: pipx install skillgate==1.0.0`}
      />
    </div>
  );
}
