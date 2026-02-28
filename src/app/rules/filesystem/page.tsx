import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';
import { getCategoryMeta, getRulesForCategory } from '@/lib/rule-catalog';

export const metadata: Metadata = {
  title: 'Filesystem Rules (SG-FS-*)',
  description: 'SkillGate detection rules for filesystem writes, deletes, and sensitive path access.',
};

const META = getCategoryMeta('FS');
const RULES = getRulesForCategory('FS');

export default function FilesystemRulesPage() {
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
