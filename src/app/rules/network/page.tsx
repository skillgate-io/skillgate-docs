import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';
import { getCategoryMeta, getRulesForCategory } from '@/lib/rule-catalog';

export const metadata: Metadata = {
  title: 'Network Rules (SG-NET-*)',
  description: 'SkillGate detection rules for network egress, DNS, HTTP callbacks, and data exfiltration.',
};

const META = getCategoryMeta('NET');
const RULES = getRulesForCategory('NET');

export default function NetworkRulesPage() {
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
