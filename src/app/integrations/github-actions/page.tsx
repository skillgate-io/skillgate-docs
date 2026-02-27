import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';
import { PageWithTOC } from '@/components/ui/PageWithTOC';

export const metadata: Metadata = {
  title: 'GitHub Actions Integration | SkillGate',
  description:
    'Block merges on policy violations and surface AI skill security findings in the GitHub Security tab. One workflow step, SARIF output, no extra tooling.',
  keywords: [
    'SkillGate GitHub Actions',
    'AI security CI pipeline',
    'SARIF GitHub Security tab',
    'block merge on violation',
    'skill scan CI',
    'agent security workflow',
    'GitHub Actions policy enforcement',
  ],
  openGraph: {
    title: 'GitHub Actions Integration | SkillGate',
    description:
      'Gate your CI pipeline with one step. Policy violations block merges. Findings appear in the GitHub Security tab.',
    type: 'article',
  },
};

const TOC = [
  { id: 'basic-workflow', label: 'Basic workflow' },
  { id: 'blocking-prs', label: 'Blocking pull requests' },
  { id: 'matrix-scan', label: 'Matrix scan' },
  { id: 'caching', label: 'Caching SkillGate' },
];

export default function GitHubActionsPage() {
  return (
    <PageWithTOC items={TOC}>
      <div style={{ maxWidth: '720px' }} className="sg-prose">
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Integrations
          </div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              margin: 0,
            }}
          >
            GitHub Actions
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Add SkillGate to your GitHub Actions workflow to block merges on policy violations and
            surface findings in the Security tab.
          </p>
        </div>

        <h2 id="basic-workflow">Basic workflow</h2>
        <p>
          Add this step to your existing workflow, or create a new file at{' '}
          <code>.github/workflows/skillgate.yml</code>:
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
          Add your API key as a repository secret under Settings &gt; Secrets and variables &gt;
          Actions. Name it <code>SKILLGATE_API_KEY</code>.
        </Callout>

        <h2 id="blocking-prs">Blocking pull requests</h2>
        <p>
          With <code>--enforce</code>, SkillGate exits with code 1 on any violation. GitHub
          Actions treats non-zero exit codes as failures, so the job will fail and block the merge
          when branch protection requires the check to pass.
        </p>
        <p>
          To require the check: go to Settings &gt; Branches &gt; Branch protection rules and add
          the SkillGate job as a required status check.
        </p>

        <h2 id="matrix-scan">Matrix scan</h2>
        <p>Run scans in parallel across multiple skill directories using a matrix strategy.</p>
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

        <h2 id="caching">Caching SkillGate</h2>
        <p>Speed up workflows by caching the pipx-installed binary between runs.</p>
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
    </PageWithTOC>
  );
}
