import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';
import { getCategoryMeta, getRulesForCategory } from '@/lib/rule-catalog';

export const metadata: Metadata = {
  title: 'Shell Rules (SG-SHELL-*)',
  description: 'SkillGate detection rules for shell execution, subprocess spawning, and destructive operations.',
};

const META = getCategoryMeta('SHELL');
const RULES = getRulesForCategory('SHELL');

export default function ShellRulesPage() {
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
