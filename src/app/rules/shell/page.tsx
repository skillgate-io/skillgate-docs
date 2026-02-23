import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';

export const metadata: Metadata = {
  title: 'Shell Rules (SG-SHELL-*)',
  description: 'SkillGate detection rules for shell execution, subprocess spawning, and destructive operations.',
};

const RULES = [
  { id: 'SG-SHELL-001', name: 'subprocess_call', description: 'Direct subprocess execution detected', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-SHELL-002', name: 'os_system', description: 'OS-level command execution via os.system()', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-SHELL-003', name: 'os_popen', description: 'OS pipe command execution via os.popen()', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-SHELL-004', name: 'subprocess_shell_true', description: 'subprocess with shell=True enables shell injection', severity: 'CRITICAL' as const, weight: 70 },
  { id: 'SG-SHELL-005', name: 'commands_module', description: 'Deprecated commands module used for shell execution', severity: 'HIGH' as const, weight: 35 },
  { id: 'SG-SHELL-006', name: 'popen2_module', description: 'popen2 module used for bidirectional shell piping', severity: 'HIGH' as const, weight: 35 },
  { id: 'SG-SHELL-007', name: 'pty_spawn', description: 'pty.spawn used to create interactive shell session', severity: 'CRITICAL' as const, weight: 75 },
  { id: 'SG-SHELL-010', name: 'child_process_exec', description: 'Node.js child_process.exec() shell execution', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-SHELL-011', name: 'child_process_spawn', description: 'Node.js child_process.spawn() process creation', severity: 'MEDIUM' as const, weight: 30 },
  { id: 'SG-SHELL-012', name: 'child_process_execsync', description: 'Synchronous shell execution via execSync()', severity: 'HIGH' as const, weight: 45 },
  { id: 'SG-SHELL-020', name: 'shell_backtick', description: 'Shell backtick command substitution detected', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-SHELL-021', name: 'shell_dollar_paren', description: 'Shell $() command substitution detected', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-SHELL-022', name: 'rm_rf_pattern', description: 'Destructive rm -rf pattern in shell commands', severity: 'CRITICAL' as const, weight: 80 },
  { id: 'SG-SHELL-023', name: 'shell_pipe_chain', description: 'Complex pipe chains that may obscure behavior', severity: 'MEDIUM' as const, weight: 20 },
  { id: 'SG-SHELL-030', name: 'go_exec_command', description: 'Go exec.Command() shell execution', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-SHELL-040', name: 'rust_process_command', description: 'Rust std::process::Command shell execution', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-SHELL-050', name: 'ruby_backtick', description: 'Ruby backtick command execution', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-SHELL-051', name: 'ruby_system', description: 'Ruby system() command execution', severity: 'HIGH' as const, weight: 40 },
];

export default function ShellRulesPage() {
  return (
    <RuleCategoryPage
      category="Shell"
      categoryId="SG-SHELL-*"
      description="Rules that detect shell command execution, subprocess spawning, pipe chaining, and destructive operations like rm -rf."
      languages={['Python', 'JavaScript', 'TypeScript', 'Shell', 'Go', 'Rust', 'Ruby']}
      rules={RULES}
    />
  );
}
