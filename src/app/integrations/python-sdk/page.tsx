import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PageWithTOC } from '@/components/ui/PageWithTOC';

export const metadata: Metadata = {
  title: 'Python SDK | SkillGate',
  description:
    'Add capability enforcement to any Python tool with one decorator. Works with PydanticAI, LangChain, and CrewAI. Fail-closed by default with typed errors for every enforcement outcome.',
  keywords: [
    'SkillGate Python SDK',
    'PydanticAI enforcement',
    'LangChain capability gating',
    'CrewAI policy enforcement',
    'AI agent security Python',
    'tool capability enforcement',
    'enforce decorator Python',
    'agent tool policy',
    'fail-closed AI tools',
    'runtime enforcement Python',
  ],
  openGraph: {
    title: 'Python SDK | SkillGate',
    description:
      'One decorator. Any Python tool. Enforcement before execution with PydanticAI, LangChain, and CrewAI support.',
    type: 'article',
  },
};

const TOC = [
  { id: 'install', label: 'Install' },
  { id: 'enforce', label: '@enforce' },
  { id: 'parameters', label: 'Parameters', indent: true },
  { id: 'enforce-async', label: '@enforce_async' },
  { id: 'error-handling', label: 'Handling outcomes' },
  { id: 'capabilities', label: 'Capability strings' },
  { id: 'pydantic-ai', label: 'PydanticAI' },
  { id: 'langchain', label: 'LangChain' },
  { id: 'crewai', label: 'CrewAI' },
  { id: 'direct-client', label: 'Direct client usage' },
  { id: 'env-vars', label: 'Environment variables' },
];

export default function PythonSdkIntegrationPage() {
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
            Python SDK
          </h1>
          <p
            style={{
              color: 'var(--text-muted)',
              marginTop: '12px',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            One decorator. Any Python tool. Every call goes through policy before it runs, and you
            get a clear decision back on every invocation.
          </p>
        </div>

        {/* ── Install ── */}
        <h2 id="install">Install</h2>
        <CodeBlock
          language="bash"
          code={`pip install skillgate-sdk

# Point the SDK at your running sidecar and authenticate
export SKILLGATE_SIDECAR_URL="http://127.0.0.1:9911"
export SKILLGATE_SLT="<your-session-license-token>"`}
        />
        <p>
          The sidecar is the local process that holds your policy and makes enforcement decisions.
          Start it with <code>skillgate run --sidecar</code> before running your agent. The SDK
          connects on first use and reconnects automatically if the connection drops.
        </p>

        {/* ── @enforce ── */}
        <h2 id="enforce">@enforce</h2>
        <p>
          Wrap any synchronous Python function. The decorator intercepts the call, asks the sidecar
          whether the declared capabilities are allowed, and either lets the function run or raises
          a typed error.
        </p>
        <CodeBlock
          language="python"
          code={`from skillgate.sdk import enforce

@enforce(capabilities=["fs.read"])
def read_file(path: str) -> str:
    return open(path).read()

@enforce(capabilities=["shell.exec"], risk_class="high")
def run_command(cmd: str) -> str:
    import subprocess
    return subprocess.check_output(cmd, shell=True, text=True)

@enforce(
    capabilities=["net.outbound"],
    fail_open=False,       # deny if sidecar is unreachable (default)
    risk_class="standard", # label sent in the invocation record
    package_version="2.1.0", # used to track AI-BOM version changes
)
def fetch_url(url: str) -> str:
    import httpx
    return httpx.get(url).text`}
        />

        <h3 id="parameters">Parameters</h3>
        <ul>
          <li>
            <code>capabilities</code> - list of capability strings this tool needs (see{' '}
            <a href="#capabilities">capability reference</a> below).
          </li>
          <li>
            <code>fail_open</code> - when <code>True</code>, the call is allowed if the sidecar is
            unreachable. Default is <code>False</code> (fail closed). Use fail open only for
            non-critical tooling or local development.
          </li>
          <li>
            <code>risk_class</code> - a label attached to every invocation record.{' '}
            <code>&quot;standard&quot;</code> by default. Set to <code>&quot;high&quot;</code> or{' '}
            <code>&quot;critical&quot;</code> for tools that touch sensitive systems.
          </li>
          <li>
            <code>package_version</code> - semver string of your tool package. When this changes,
            the SDK automatically updates the tool&apos;s AI-BOM in the registry so your team can
            see what version of each tool is running in production.
          </li>
          <li>
            <code>client</code> - pass a custom <code>SkillGateClient</code> instance if you need
            per-tool sidecar URLs or timeout settings. The SDK uses a shared process-level client
            by default.
          </li>
        </ul>

        {/* ── @enforce_async ── */}
        <h2 id="enforce-async">@enforce_async</h2>
        <p>
          The async version of the decorator. It uses a per-call timeout so enforcement never
          blocks your event loop, even under load.
        </p>
        <CodeBlock
          language="python"
          code={`from skillgate.sdk import enforce_async

@enforce_async(capabilities=["net.outbound"], timeout_ms=50)
async def fetch_data(url: str) -> str:
    import httpx
    async with httpx.AsyncClient() as client:
        return (await client.get(url)).text

@enforce_async(capabilities=["fs.write"], fail_open=False)
async def write_report(path: str, content: str) -> None:
    import aiofiles
    async with aiofiles.open(path, "w") as f:
        await f.write(content)`}
        />
        <p>
          <code>timeout_ms</code> defaults to 50 ms. If the sidecar does not respond within that
          window and <code>fail_open=True</code>, the call proceeds with an audit record noting the
          degraded state. With <code>fail_open=False</code> (default), an{' '}
          <code>EnforcerUnavailableError</code> is raised instead.
        </p>

        {/* ── Handling outcomes ── */}
        <h2 id="error-handling">Handling enforcement outcomes</h2>
        <p>
          Every decorated call produces one of three outcomes. Import the error types and handle
          them the same way you would any other application error.
        </p>
        <CodeBlock
          language="python"
          code={`from skillgate.sdk import (
    enforce,
    CapabilityDeniedError,
    ApprovalPendingError,
    EnforcerUnavailableError,
)

@enforce(capabilities=["fs.read", "net.outbound"])
def fetch_and_save(url: str, path: str) -> None:
    ...

try:
    fetch_and_save("https://example.com/data", "/tmp/report.json")

except CapabilityDeniedError as e:
    # Policy blocked the call.
    # e.decision_code  -> e.g. "SG_DENY_BUDGET_EXCEEDED"
    # e.reason_codes   -> list of reasons, e.g. ["rate_limit_hit"]
    # e.budgets        -> current budget state per capability
    print(f"Blocked: {e.decision_code} - {e.reason_codes}")

except ApprovalPendingError as e:
    # This capability requires a human approval before proceeding.
    # e.approval_id           -> unique ID for this approval request
    # e.capabilities_needed   -> which capabilities need sign-off
    print(f"Waiting for approval: {e.approval_id}")
    # Approve via: skillgate approval sign --id {e.approval_id}

except EnforcerUnavailableError as e:
    # Sidecar is not reachable and fail_open=False.
    # e.last_attempt_at -> UTC timestamp of the failed attempt
    print(f"Enforcer unreachable since {e.last_attempt_at}")
    # Start the sidecar: skillgate run --sidecar`}
        />

        {/* ── Capabilities ── */}
        <h2 id="capabilities">Capability strings</h2>
        <p>
          Use these strings in the <code>capabilities</code> list. You can declare multiple
          capabilities on a single tool.
        </p>
        <table>
          <thead>
            <tr>
              <th>String</th>
              <th>What it covers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>fs.read</code>
              </td>
              <td>Reading files from the local filesystem</td>
            </tr>
            <tr>
              <td>
                <code>fs.write</code>
              </td>
              <td>Writing or deleting files on the local filesystem</td>
            </tr>
            <tr>
              <td>
                <code>shell.exec</code>
              </td>
              <td>Running shell commands or subprocesses</td>
            </tr>
            <tr>
              <td>
                <code>net.outbound</code>
              </td>
              <td>Any outbound network connection</td>
            </tr>
            <tr>
              <td>
                <code>net.http</code>
              </td>
              <td>HTTP requests specifically</td>
            </tr>
            <tr>
              <td>
                <code>eval.code</code>
              </td>
              <td>Evaluating or executing dynamic code strings</td>
            </tr>
            <tr>
              <td>
                <code>secrets.read</code>
              </td>
              <td>Reading credentials, tokens, or key material</td>
            </tr>
          </tbody>
        </table>

        {/* ── PydanticAI ── */}
        <h2 id="pydantic-ai">PydanticAI</h2>
        <CodeBlock language="bash" code={`pip install skillgate-sdk[pydantic-ai]`} />
        <p>
          Use <code>skillgate_wrapped</code> directly on individual tool functions. The original
          type annotations and docstring are preserved so PydanticAI can still introspect the
          schema.
        </p>
        <CodeBlock
          language="python"
          code={`from pydantic_ai import Agent
from skillgate.sdk.integrations.pydantic_ai import skillgate_wrapped

@skillgate_wrapped(capabilities=["net.outbound"])
async def fetch_weather(city: str) -> str:
    return f"Weather for {city}"

@skillgate_wrapped(capabilities=["fs.read"])
async def read_config(path: str) -> str:
    return open(path).read()

agent = Agent("claude-opus-4-6", tools=[fetch_weather, read_config])`}
        />
        <p>
          When you have a large list of tools, use <code>SkillGateMiddleware</code> to wrap them in
          one go. Provide a <code>capabilities_map</code> keyed by function name, and a{' '}
          <code>default_capabilities</code> fallback for any tools not in the map.
        </p>
        <CodeBlock
          language="python"
          code={`from skillgate.sdk.integrations.pydantic_ai import SkillGateMiddleware

middleware = SkillGateMiddleware(
    capabilities_map={
        "fetch_weather": ["net.outbound"],
        "read_config":   ["fs.read"],
        "run_shell":     ["shell.exec"],
    },
    default_capabilities=["fs.read"],
)

enforced_tools = middleware.wrap_tools([fetch_weather, read_config, run_shell])
agent = Agent("claude-opus-4-6", tools=enforced_tools)`}
        />

        {/* ── LangChain ── */}
        <h2 id="langchain">LangChain</h2>
        <CodeBlock language="bash" code={`pip install skillgate-sdk[langchain]`} />
        <p>
          For new tools, subclass <code>SkillGateTool</code> instead of <code>BaseTool</code>.
          Declare the capabilities on the class and implement <code>_run</code> as usual. LangSmith
          tracing is not affected.
        </p>
        <CodeBlock
          language="python"
          code={`from skillgate.sdk.integrations.langchain import SkillGateTool, SkillGateToolkit

class ReadFileTool(SkillGateTool):
    name: str = "read_file"
    description: str = "Read a file from disk."
    skillgate_capabilities: list[str] = ["fs.read"]

    def _run(self, path: str) -> str:
        return open(path).read()

class FetchURLTool(SkillGateTool):
    name: str = "fetch_url"
    description: str = "Fetch content from a URL."
    skillgate_capabilities: list[str] = ["net.outbound"]

    def _run(self, url: str) -> str:
        import httpx
        return httpx.get(url).text`}
        />
        <p>
          To add enforcement to tools you did not write, wrap them with{' '}
          <code>SkillGateToolkit</code>. Pass your existing tool instances and a capabilities map.
        </p>
        <CodeBlock
          language="python"
          code={`from langchain_community.tools import ShellTool, WikipediaQueryRun

toolkit = SkillGateToolkit(
    tools=[ShellTool(), WikipediaQueryRun()],
    capabilities_map={
        "terminal":  ["shell.exec"],
        "wikipedia": ["net.outbound"],
    },
)

enforced = toolkit.get_tools()  # drop-in replacement`}
        />

        {/* ── CrewAI ── */}
        <h2 id="crewai">CrewAI</h2>
        <CodeBlock language="bash" code={`pip install skillgate-sdk[crewai]`} />
        <p>
          Gate task execution with <code>enforce_crew_task</code>. The decorator fires before the
          task body and at each delegation hop in a delegation chain.
        </p>
        <CodeBlock
          language="python"
          code={`from skillgate.sdk.integrations.crewai import enforce_crew_task, SkillGateTask

# Decorator approach
@enforce_crew_task(capabilities=["fs.read", "net.outbound"])
def execute_research(task):
    return task.execute()

# Class wrapper approach
from crewai import Task

guarded_task = SkillGateTask(
    inner_task=Task(description="Summarise the quarterly report"),
    capabilities=["fs.read"],
)
result = guarded_task.execute()`}
        />

        {/* ── Direct client ── */}
        <h2 id="direct-client">Direct client usage</h2>
        <p>
          If you need more control - custom timeouts, per-workspace sidecar URLs, or programmatic
          access to enforcement decisions - use <code>SkillGateClient</code> directly.
        </p>
        <CodeBlock
          language="python"
          code={`from skillgate.sdk import SkillGateClient

with SkillGateClient(
    sidecar_url="http://127.0.0.1:9911",
    timeout_ms=100,
    fail_open=False,
) as client:
    decision = client.decide(
        invocation_id="my-uuid",
        tool_invocation={
            "invocation_id": "my-uuid",
            "tool": {"name": "my_tool", "capabilities": ["fs.read"], "risk_class": "standard"},
        },
    )
    print(decision["decision"])       # "ALLOW" | "DENY" | "REQUIRE_APPROVAL"
    print(decision["decision_code"])  # e.g. "SG_ALLOW_POLICY_PASS"
    print(decision["reason_codes"])   # list of reasons

# Async version
from skillgate.sdk import AsyncSkillGateClient

async with AsyncSkillGateClient(timeout_ms=50) as client:
    decision = await client.decide(invocation_id, invocation_dict)`}
        />

        {/* ── Env vars ── */}
        <h2 id="env-vars">Environment variables</h2>
        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Purpose</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>SKILLGATE_SIDECAR_URL</code>
              </td>
              <td>URL of the local sidecar</td>
              <td>
                <code>http://localhost:8910</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>SKILLGATE_SLT</code>
              </td>
              <td>Session License Token for authentication</td>
              <td>None</td>
            </tr>
            <tr>
              <td>
                <code>SKILLGATE_ACTOR_ID</code>
              </td>
              <td>Identity of the agent or user making tool calls</td>
              <td>
                <code>sdk-user</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>SKILLGATE_WORKSPACE_ID</code>
              </td>
              <td>Workspace scope for multi-tenant deployments</td>
              <td>
                <code>local</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>SKILLGATE_SESSION_ID</code>
              </td>
              <td>Session grouping for audit records</td>
              <td>Auto-generated per process</td>
            </tr>
            <tr>
              <td>
                <code>SKILLGATE_ENVIRONMENT</code>
              </td>
              <td>Deployment environment sent in invocation context</td>
              <td>
                <code>development</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>SKILLGATE_FRAMEWORK</code>
              </td>
              <td>Framework label for AI-BOM records</td>
              <td>
                <code>python-sdk</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>SKILLGATE_AGENT_VERSION</code>
              </td>
              <td>Your agent version sent in invocation records</td>
              <td>
                <code>unknown</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>SKILLGATE_TRUST_TIER</code>
              </td>
              <td>Trust tier label for the calling agent</td>
              <td>
                <code>standard</code>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Related ── */}
        <h2>Related pages</h2>
        <ul>
          <li>
            <Link href="/integrations/vscode-extension" className="sg-link">
              VS Code extension
            </Link>
          </li>
          <li>
            <Link href="/integrations/codex-cli" className="sg-link">
              Codex CLI integration
            </Link>
          </li>
          <li>
            <Link href="/cli/run" className="sg-link">
              skillgate run - start the sidecar
            </Link>
          </li>
          <li>
            <Link href="/cli/approval" className="sg-link">
              skillgate approval - sign pending approvals
            </Link>
          </li>
          <li>
            <Link href="/enterprise/security" className="sg-link">
              Enterprise security
            </Link>
          </li>
        </ul>
      </div>
    </PageWithTOC>
  );
}
