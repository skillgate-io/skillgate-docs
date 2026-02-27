import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';
import { PageWithTOC } from '@/components/ui/PageWithTOC';

export const metadata: Metadata = {
  title: 'GitLab CI Integration | SkillGate',
  description:
    'Block GitLab CI deployments on policy violations. One job, SAST artifact output, works on merge requests and default branch pushes.',
  keywords: [
    'SkillGate GitLab CI',
    'GitLab SAST SkillGate',
    'AI skill security pipeline',
    'block merge request violation',
    'GitLab policy enforcement',
    'agent security CI',
    'skill scan GitLab',
  ],
  openGraph: {
    title: 'GitLab CI Integration | SkillGate',
    description:
      'Add SkillGate to .gitlab-ci.yml to block deployments on policy violations with SAST output.',
    type: 'article',
  },
};

const TOC = [
  { id: 'basic-pipeline', label: 'Basic pipeline' },
  { id: 'merge-requests', label: 'Merge requests only' },
  { id: 'fail-fast', label: 'Fail fast' },
];

export default function GitLabCIPage() {
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
            GitLab CI
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Add SkillGate to your GitLab CI pipeline to scan skills before every merge and
            deployment.
          </p>
        </div>

        <h2 id="basic-pipeline">Basic pipeline</h2>
        <p>
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
          Add <code>SKILLGATE_API_KEY</code> as a protected, masked variable under Settings &gt;
          CI/CD &gt; Variables.
        </Callout>

        <h2 id="merge-requests">Merge requests only</h2>
        <p>
          Limit the scan job to merge request events and the default branch to avoid running on
          every unrelated branch push.
        </p>
        <CodeBlock
          language="yaml"
          code={`skillgate-scan:
  stage: security
  rules:
    - if: \$CI_PIPELINE_SOURCE == "merge_request_event"
    - if: \$CI_COMMIT_BRANCH == \$CI_DEFAULT_BRANCH`}
        />

        <h2 id="fail-fast">Fail fast</h2>
        <p>
          The scan job exits with code 1 on any violation when <code>--enforce</code> is set.
          GitLab CI marks the pipeline as failed, which blocks the merge request from being merged
          when the job is required.
        </p>
      </div>
    </PageWithTOC>
  );
}
