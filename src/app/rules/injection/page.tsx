import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';
import { getCategoryMeta, getRulesForCategory } from '@/lib/rule-catalog';

export const metadata: Metadata = {
  title: 'Injection Rules (SG-INJ-*)',
  description: 'SkillGate detection rules for prompt injection, SQL injection, command injection, and unsafe data flows.',
};

const META = getCategoryMeta('INJ');
const RULES = getRulesForCategory('INJ');

export default function InjectionRulesPage() {
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
