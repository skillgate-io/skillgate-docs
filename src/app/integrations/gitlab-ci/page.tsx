import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'GitLab CI Integration',
  description: 'Add SkillGate to your GitLab CI pipeline to block deployments on policy violations.',
};

export default function GitLabCIPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Integrations</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          GitLab CI
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Add SkillGate to your GitLab CI pipeline to scan skills before every merge and deployment.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Basic pipeline</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.9rem' }}>
        Add a scan job to your <code>.gitlab-ci.yml</code>:
      </p>
      <CodeBlock
        language="yaml"
        filename=".gitlab-ci.yml"
        code={`stages:
  - security
  - build
  - deploy

skillgate-scan:
  stage: security
  image: python:3.11-slim
  before_script:
    - pip install pipx
    - pipx install skillgate
    - export PATH="$PATH:/root/.local/bin"
  script:
    - skillgate scan ./skills
        --enforce
        --policy production
        --output sarif
        --report-file gl-sast-report.sarif
  artifacts:
    reports:
      sast: gl-sast-report.sarif
    when: always
  variables:
    SKILLGATE_API_KEY: \$SKILLGATE_API_KEY`}
      />

      <Callout variant="info" title="CI/CD variable">
        Add <code>SKILLGATE_API_KEY</code> as a protected, masked variable under Settings &gt; CI/CD &gt; Variables.
      </Callout>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Only on merge requests</h2>
      <CodeBlock
        language="yaml"
        code={`skillgate-scan:
  stage: security
  rules:
    - if: \$CI_PIPELINE_SOURCE == "merge_request_event"
    - if: \$CI_COMMIT_BRANCH == \$CI_DEFAULT_BRANCH`}
      />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '16px' }}>Fail fast</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.9rem', lineHeight: 1.7 }}>
        The scan job exits with code 1 on any violation when <code>--enforce</code> is set. GitLab CI marks the pipeline as failed, blocking the merge request from being merged.
      </p>
    </div>
  );
}
