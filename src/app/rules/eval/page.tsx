import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';
import { getCategoryMeta, getRulesForCategory } from '@/lib/rule-catalog';

export const metadata: Metadata = {
  title: 'Eval Rules (SG-EVAL-*)',
  description: 'SkillGate detection rules for dynamic code evaluation, exec, pickle, and unsafe deserialization.',
};

const META = getCategoryMeta('EVAL');
const RULES = getRulesForCategory('EVAL');

export default function EvalRulesPage() {
  return (
    <RuleCategoryPage
      category={META.label}
      categoryId={META.id}
      description={META.desc}
      languages={META.languages}
      rules={RULES}
    />
  );
}
