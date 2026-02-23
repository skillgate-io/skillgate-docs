import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';

export const metadata: Metadata = {
  title: 'Eval Rules (SG-EVAL-*)',
  description: 'SkillGate detection rules for dynamic code evaluation, exec, pickle, and unsafe deserialization.',
};

const RULES = [
  { id: 'SG-EVAL-001', name: 'python_eval', description: 'Dynamic code evaluation via eval()', severity: 'CRITICAL' as const, weight: 80 },
  { id: 'SG-EVAL-002', name: 'python_exec', description: 'Dynamic code execution via exec()', severity: 'CRITICAL' as const, weight: 80 },
  { id: 'SG-EVAL-003', name: 'python_compile', description: 'Code compiled at runtime via compile()', severity: 'HIGH' as const, weight: 60 },
  { id: 'SG-EVAL-004', name: 'pickle_loads', description: 'Unsafe pickle deserialization — arbitrary code execution risk', severity: 'CRITICAL' as const, weight: 90 },
  { id: 'SG-EVAL-005', name: 'marshal_loads', description: 'Unsafe marshal deserialization', severity: 'CRITICAL' as const, weight: 85 },
  { id: 'SG-EVAL-006', name: 'yaml_unsafe_load', description: 'yaml.load() without Loader= — executes arbitrary Python', severity: 'CRITICAL' as const, weight: 80 },
  { id: 'SG-EVAL-007', name: 'dunder_import', description: '__import__() dynamic import that may load attacker code', severity: 'HIGH' as const, weight: 55 },
  { id: 'SG-EVAL-008', name: 'importlib_import_module', description: 'Dynamic module loading via importlib', severity: 'MEDIUM' as const, weight: 30 },
  { id: 'SG-EVAL-010', name: 'js_eval', description: 'JavaScript eval() — dynamic code execution', severity: 'CRITICAL' as const, weight: 80 },
  { id: 'SG-EVAL-011', name: 'js_function_constructor', description: 'new Function() — dynamic code execution', severity: 'CRITICAL' as const, weight: 80 },
  { id: 'SG-EVAL-012', name: 'js_settimeout_string', description: 'setTimeout() with string argument — implicit eval', severity: 'HIGH' as const, weight: 55 },
];

export default function EvalRulesPage() {
  return (
    <RuleCategoryPage
      category="Eval"
      categoryId="SG-EVAL-*"
      description="Rules that detect dynamic code evaluation, runtime compilation, unsafe deserialization (pickle, marshal, yaml.load), and other patterns that allow arbitrary code execution."
      languages={['Python', 'JavaScript', 'TypeScript']}
      rules={RULES}
    />
  );
}
