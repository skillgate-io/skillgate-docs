import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PageWithTOC } from '@/components/ui/PageWithTOC';

export const metadata: Metadata = {
  title: 'Language Shims | SkillGate',
  description:
    'Lightweight SkillGate sidecar clients for Go, Ruby, Rust, .NET, and Java. Call POST /v1/decide from non-Python runtimes with one shared contract.',
  keywords: [
    'SkillGate Go SDK',
    'SkillGate Ruby client',
    'SkillGate Rust client',
    'SkillGate .NET client',
    'SkillGate Java client',
    'AI agent enforcement Go',
    'AI agent policy enforcement multi-language',
    'sidecar HTTP client agent security',
    'runtime enforcement any language',
    'agent tool enforcement non-python',
  ],
  openGraph: {
    title: 'Language Shims | SkillGate',
    description:
      'Lightweight sidecar clients for Go, Ruby, Rust, .NET, and Java. Enforce tool capability policy from non-Python runtimes.',
    type: 'article',
  },
};

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'availability', label: 'Package availability' },
  { id: 'go', label: 'Go' },
  { id: 'ruby', label: 'Ruby' },
  { id: 'rust', label: 'Rust' },
  { id: 'dotnet', label: '.NET' },
  { id: 'java', label: 'Java' },
  { id: 'decision-codes', label: 'Decision codes' },
  { id: 'open-core', label: 'Open-core status' },
];

export default function LanguageShimsPage() {
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
            Language Shims
          </h1>
          <p
            style={{
              color: 'var(--text-muted)',
              marginTop: '12px',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            The enforcement sidecar speaks HTTP. These shims are thin clients that wrap{' '}
            <code>POST /v1/decide</code> so you can enforce tool capability policy from Go, Ruby,
            Rust, .NET, Java, or TypeScript without adding a Python dependency.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
          {['Go', 'Ruby', 'Rust', '.NET', 'Java', 'Registry rollout', 'Open Source'].map((item) => (
            <span
              key={item}
              style={{
                fontSize: '0.78rem',
                padding: '4px 10px',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                background: 'var(--sidebar-bg)',
                color: 'var(--text)',
              }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* ── Overview ── */}
        <h2 id="overview">Overview</h2>
        <p>
          All shims follow the same pattern: create a client pointing at the local sidecar, call{' '}
          <code>Decide()</code> with a <code>ToolInvocation</code>, and check whether the response
          is <code>ALLOW</code>, <code>DENY</code>, <code>FAIL</code>, or{' '}
          <code>REQUIRE_APPROVAL</code>. The sidecar holds the policy and does the enforcement
          work. Shims only handle HTTP serialization.
        </p>
        <CodeBlock
          language="text"
          code={`[Your service / agent]
       |
       | ToolInvocation (JSON)
       v
[skillgate-enforcer-sidecar]  POST /v1/decide
       |
       | DecisionRecord (JSON)
       v
[Your code] -- ALLOW → proceed
            -- DENY  → raise error / surface to user
            -- REQUIRE_APPROVAL → pause and notify reviewer`}
        />
        <p>
          Start the sidecar before your service starts. It reads the local policy snapshot and your
          Session License Token, then listens on <code>localhost:8910</code> by default.
        </p>
        <CodeBlock
          language="bash"
          code={`skillgate auth login
python -m uvicorn skillgate.sidecar.app:create_sidecar_app \\
  --factory --host 127.0.0.1 --port 8910`}
        />

        <h2 id="availability">Package availability</h2>
        <p>
          Use the language your service already runs on and keep one shared enforcement path
          through the sidecar. Current shim distribution is source-first from the SkillGate repo.
        </p>
        <p>
          For Node.js today, use <code>@skillgate-io/cli</code> for CLI workflows. A dedicated
          TypeScript sidecar shim package is planned.
        </p>

        {/* ── Go ── */}
        <h2 id="go">Go</h2>
        <CodeBlock
          language="bash"
          code={`go get github.com/skillgate-io/skillgate/go-shim`}
        />
        <CodeBlock
          language="go"
          code={`package main

import (
    "context"
    "fmt"
    "log"
    "time"

    skillgate "github.com/skillgate-io/skillgate/go-shim"
)

func main() {
    client := skillgate.New(skillgate.DefaultConfig())

    invocation := skillgate.ToolInvocation{
        InvocationID: "inv-001",
        Timestamp:    time.Now().UTC(),
        Actor: skillgate.Actor{
            Type: "agent", ID: "my-go-agent", WorkspaceID: "ws_prod", SessionID: "sess-001",
        },
        Agent: skillgate.Agent{
            Name: "my-go-agent", Version: "1.0.0", Framework: "custom", TrustTier: "standard",
        },
        Tool: skillgate.Tool{
            Name:         "fs.read",
            Provider:     "local",
            Capabilities: []string{"fs.read"},
            RiskClass:    "low",
        },
        Request: skillgate.ToolRequest{
            Params:       map[string]any{"path": "/etc/config"},
            ResourceRefs: []string{"/etc/config"},
        },
        Context: skillgate.ExecutionContext{
            Repo: "my-repo",
            Environment: "production",
            DataClassification: "internal",
            NetworkZone: "private",
        },
    }

    decision, err := client.Decide(context.Background(), invocation)
    if err != nil {
        log.Fatal(err)
    }

    switch decision.Decision {
    case "ALLOW":
        fmt.Println("allowed")
    case "DENY":
        fmt.Printf("blocked: %s\\n", decision.DecisionCode)
    case "REQUIRE_APPROVAL":
        fmt.Printf("pending approval: %s\\n", decision.DecisionCode)
    }
}`}
        />
        <p>
          <code>DefaultConfig()</code> reads <code>SKILLGATE_SIDECAR_URL</code> and{' '}
          <code>SKILLGATE_SLT</code> from environment variables. Override them by setting fields on{' '}
          <code>skillgate.Config</code> directly.
        </p>

        {/* ── Ruby ── */}
        <h2 id="ruby">Ruby</h2>
        <CodeBlock
          language="ruby"
          code={`# Gemfile
gem "skillgate", path: "../skillgate/ruby-shim"`}
        />
        <CodeBlock
          language="ruby"
          code={`require 'skillgate'
require 'time'

client = SkillGate::Client.new(
  SkillGate::Config.from_env
)

invocation = SkillGate::ToolInvocation.new(
  invocation_id: 'inv-001',
  timestamp: Time.now.utc,
  actor: SkillGate::Actor.new(type: 'agent', id: 'my-ruby-agent', workspace_id: 'ws_prod', session_id: 'sess-001'),
  agent: SkillGate::Agent.new(name: 'my-ruby-agent', version: '1.0.0', framework: 'custom', trust_tier: 'standard'),
  tool: SkillGate::Tool.new(name: 'fs.read', provider: 'local', capabilities: ['fs.read'], risk_class: 'low'),
  request: SkillGate::ToolRequest.new(params: { path: '/etc/config' }, resource_refs: ['/etc/config']),
  context: SkillGate::ExecutionContext.new(repo: 'my-repo', environment: 'production', data_classification: 'internal', network_zone: 'private')
)

decision = client.decide(invocation)

if decision.allowed?
  puts 'allowed'
else
  raise "blocked: #{decision.decision_code}"
end`}
        />

        {/* ── Rust ── */}
        <h2 id="rust">Rust</h2>
        <CodeBlock
          language="toml"
          code={`# Cargo.toml
[dependencies]
skillgate = { path = "../skillgate/rust-shim" }
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
chrono = "0.4"`}
        />
        <CodeBlock
          language="rust"
          code={`use chrono::Utc;
use skillgate::{Actor, Agent, Client, Config, ExecutionContext, Tool, ToolInvocation, ToolRequest};

#[tokio::main]
async fn main() -> Result<(), skillgate::Error> {
    let client = Client::new(Config::from_env());

    let invocation = ToolInvocation {
        invocation_id: "inv-001".into(),
        timestamp: Utc::now(),
        actor: Actor {
            type_: "agent".into(),
            id: "my-rust-agent".into(),
            workspace_id: "ws_prod".into(),
            session_id: "sess-001".into(),
        },
        agent: Agent {
            name: "my-rust-agent".into(),
            version: "1.0.0".into(),
            framework: "custom".into(),
            trust_tier: "standard".into(),
        },
        tool: Tool {
            name: "fs.read".into(),
            provider: "local".into(),
            capabilities: vec!["fs.read".into()],
            risk_class: "low".into(),
        },
        request: ToolRequest::default(),
        context: ExecutionContext {
            repo: "my-repo".into(),
            environment: "production".into(),
            data_classification: "internal".into(),
            network_zone: "private".into(),
        },
    };

    let decision = client.decide(invocation).await?;

    match decision.decision.as_str() {
        "ALLOW" => println!("allowed"),
        "DENY"  => eprintln!("blocked: {}", decision.decision_code),
        _       => eprintln!("unknown: {:?}", decision),
    }
    Ok(())
}`}
        />

        {/* ── .NET ── */}
        <h2 id="dotnet">.NET</h2>
        <CodeBlock
          language="bash"
          code={`dotnet add reference ../skillgate/dotnet-shim/SkillGate.Client/SkillGate.Client.csproj`}
        />
        <CodeBlock
          language="csharp"
          code={`using SkillGate;

var client = new SkillGateClient(SkillGateConfig.FromEnv());

var invocation = new ToolInvocation(
    InvocationId: "inv-001",
    Timestamp: DateTimeOffset.UtcNow,
    Actor: new Actor("agent", "my-dotnet-agent", "ws_prod", "sess-001"),
    Agent: new Agent("my-dotnet-agent", "1.0.0", "custom", "standard"),
    Tool: new Tool("fs.read", "local", new[] { "fs.read" }, "low"),
    Request: new ToolRequest(),
    Context: new ExecutionContext("my-repo", "production", "internal", "private")
);

var decision = await client.DecideAsync(invocation);

if (decision.Decision == "DENY")
    throw new InvalidOperationException($"Blocked: {decision.DecisionCode}");`}
        />

        {/* ── Java ── */}
        <h2 id="java">Java</h2>
        <CodeBlock
          language="bash"
          code={`mvn -f ../skillgate/java-shim/pom.xml install`}
        />
        <CodeBlock
          language="xml"
          code={`<!-- pom.xml -->
<dependency>
  <groupId>io.skillgate</groupId>
  <artifactId>skillgate-java</artifactId>
  <version>0.1.0</version>
</dependency>`}
        />
        <CodeBlock
          language="java"
          code={`import io.skillgate.SkillGateClient;
import java.time.Instant;
import java.util.List;
import java.util.Map;

SkillGateClient client = new SkillGateClient(
    SkillGateClient.Config.fromEnv()
);

SkillGateClient.ToolInvocation invocation = new SkillGateClient.ToolInvocation(
    "inv-001",
    Instant.now(),
    new SkillGateClient.Actor("agent", "my-java-agent", "ws_prod", "sess-001"),
    new SkillGateClient.Agent("my-java-agent", "1.0.0", "custom", "standard"),
    new SkillGateClient.Tool("fs.read", "local", List.of("fs.read"), "low"),
    new SkillGateClient.ToolRequest(Map.of("path", "/etc/config"), List.of("/etc/config")),
    new SkillGateClient.ExecutionContext("my-repo", "production", "internal", "private")
);

SkillGateClient.DecisionRecord decision = client.decide(invocation);

if ("DENY".equals(decision.decision())) {
    throw new IllegalStateException("Blocked: " + decision.decisionCode());
}`}
        />

        {/* ── Decision codes ── */}
        <h2 id="decision-codes">Decision codes</h2>
        <p>
          All shims return the same <code>DecisionRecord</code> structure. Key fields to check:
        </p>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>decision</code></td>
              <td>string</td>
              <td>
                <code>ALLOW</code> | <code>DENY</code> | <code>FAIL</code> |{' '}
                <code>REQUIRE_APPROVAL</code>
              </td>
            </tr>
            <tr>
              <td><code>decision_code</code></td>
              <td>string</td>
              <td>
                e.g. <code>SG_ALLOW_POLICY_PASS</code>, <code>SG_DENY_BUDGET_EXCEEDED</code>,{' '}
                <code>SG_APPROVAL_REQUIRED</code>
              </td>
            </tr>
            <tr>
              <td><code>reason_codes</code></td>
              <td>string[]</td>
              <td>Specific reasons within the decision</td>
            </tr>
            <tr>
              <td><code>budgets</code></td>
              <td>object</td>
              <td>Remaining budget per capability for this workspace</td>
            </tr>
            <tr>
              <td><code>degraded</code></td>
              <td>bool</td>
              <td>True when operating in offline or limited mode</td>
            </tr>
          </tbody>
        </table>
        <p>
          Endpoint-level API reference is still being finalized. For now, use{' '}
          <code>decision_code</code> and <code>reason_codes</code> from the response payload for
          runtime handling.
        </p>

        {/* ── Open-core ── */}
        <h2 id="open-core">Open-core status</h2>
        <p>
          All language shims are Community Edition. Source code is published under an open-source
          license at <code>github.com/skillgate-io</code>. The sidecar they call is also CE for
          core runtime enforcement. Enterprise Edition adds the SaaS control plane, RBAC, SIEM
          connectors, and SSO.
        </p>

        {/* ── Related ── */}
        <h2>Related pages</h2>
        <ul>
          <li>
            <Link href="/integrations/python-sdk" className="sg-link">
              Python SDK
            </Link>
          </li>
          <li>
            <Link href="/runtime-control" className="sg-link">
              Runtime control
            </Link>
          </li>
          <li>
            <Link href="/api" className="sg-link">
              API reference
            </Link>
          </li>
          <li>
            <Link href="/cli/run" className="sg-link">
              skillgate run
            </Link>
          </li>
        </ul>
      </div>
    </PageWithTOC>
  );
}
