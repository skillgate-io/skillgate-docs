import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';

export const metadata: Metadata = {
  title: 'Injection Rules (SG-INJ-*)',
  description: 'SkillGate detection rules for prompt injection, SQL injection, command injection, and unsafe data flows.',
};

const RULES = [
  { id: 'SG-INJ-001', name: 'prompt_injection_concat', description: 'User input concatenated directly into a prompt string', severity: 'HIGH' as const, weight: 65 },
  { id: 'SG-INJ-002', name: 'prompt_injection_format', description: 'User input passed to format string used as a prompt', severity: 'HIGH' as const, weight: 60 },
  { id: 'SG-INJ-003', name: 'sql_injection_fstring', description: 'SQL query built with f-string and unvalidated input', severity: 'CRITICAL' as const, weight: 85 },
  { id: 'SG-INJ-004', name: 'sql_injection_concat', description: 'SQL query built by string concatenation with user input', severity: 'CRITICAL' as const, weight: 85 },
  { id: 'SG-INJ-005', name: 'command_injection_fstring', description: 'Shell command built with f-string and unvalidated input', severity: 'CRITICAL' as const, weight: 90 },
  { id: 'SG-INJ-006', name: 'command_injection_format', description: 'Shell command built with .format() and user input', severity: 'CRITICAL' as const, weight: 90 },
  { id: 'SG-INJ-007', name: 'template_injection', description: 'User input used in server-side template rendering', severity: 'HIGH' as const, weight: 70 },
  { id: 'SG-INJ-008', name: 'path_injection', description: 'User input used in file path construction without sanitization', severity: 'HIGH' as const, weight: 60 },
  { id: 'SG-INJ-009', name: 'ldap_injection', description: 'LDAP query built with unvalidated input', severity: 'HIGH' as const, weight: 65 },
  { id: 'SG-INJ-010', name: 'xml_injection', description: 'XML document built with unvalidated user input', severity: 'HIGH' as const, weight: 55 },
  { id: 'SG-INJ-011', name: 'nosql_injection', description: 'NoSQL query operator injection pattern', severity: 'HIGH' as const, weight: 65 },
  { id: 'SG-INJ-012', name: 'regex_injection', description: 'Regular expression built from user input — ReDoS risk', severity: 'MEDIUM' as const, weight: 30 },
];

export default function InjectionRulesPage() {
  return (
    <RuleCategoryPage
      category="Injection"
      categoryId="SG-INJ-*"
      description="Rules that detect unsafe input-to-execution data flows: prompt injection, SQL injection, command injection, template injection, and path traversal patterns."
      languages={['Python', 'JavaScript', 'TypeScript', 'Shell', 'Go', 'Ruby']}
      rules={RULES}
    />
  );
}
