import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';
import { getCategoryMeta, getRulesForCategory } from '@/lib/rule-catalog';

export const metadata: Metadata = {
  title: 'Obfuscation Rules (SG-OBF-*)',
  description: 'SkillGate detection rules for base64 payloads, encoding tricks, and anti-analysis indicators.',
};

const META = getCategoryMeta('OBF');
const RULES = getRulesForCategory('OBF');

export default function ObfuscationRulesPage() {
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
