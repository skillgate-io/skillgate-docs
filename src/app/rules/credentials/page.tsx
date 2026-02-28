import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';
import { getCategoryMeta, getRulesForCategory } from '@/lib/rule-catalog';

export const metadata: Metadata = {
  title: 'Credential Rules (SG-CRED-*)',
  description: 'SkillGate detection rules for hardcoded credentials, token exposure, and secret leakage.',
};

const META = getCategoryMeta('CRED');
const RULES = getRulesForCategory('CRED');

export default function CredentialsRulesPage() {
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
