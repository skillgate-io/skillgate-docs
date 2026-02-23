import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';

export const metadata: Metadata = {
  title: 'Credential Rules (SG-CRED-*)',
  description: 'SkillGate detection rules for hardcoded credentials, token exposure, and secret leakage.',
};

const RULES = [
  { id: 'SG-CRED-001', name: 'hardcoded_password', description: 'Hardcoded password variable assignment detected', severity: 'HIGH' as const, weight: 60 },
  { id: 'SG-CRED-002', name: 'hardcoded_api_key', description: 'Hardcoded API key or token string detected', severity: 'HIGH' as const, weight: 65 },
  { id: 'SG-CRED-003', name: 'hardcoded_secret', description: 'Variable named secret or SECRET with string value', severity: 'HIGH' as const, weight: 60 },
  { id: 'SG-CRED-004', name: 'aws_access_key', description: 'AWS access key ID pattern (AKIA...) detected', severity: 'CRITICAL' as const, weight: 90 },
  { id: 'SG-CRED-005', name: 'aws_secret_key', description: 'AWS secret access key pattern detected', severity: 'CRITICAL' as const, weight: 90 },
  { id: 'SG-CRED-006', name: 'github_token', description: 'GitHub personal access token (ghp_...) detected', severity: 'CRITICAL' as const, weight: 90 },
  { id: 'SG-CRED-007', name: 'env_secret_print', description: 'Secret value from environment printed to stdout', severity: 'HIGH' as const, weight: 55 },
  { id: 'SG-CRED-008', name: 'env_secret_log', description: 'Secret environment variable passed to logging', severity: 'HIGH' as const, weight: 55 },
  { id: 'SG-CRED-009', name: 'bearer_token_literal', description: 'Bearer token literal in Authorization header', severity: 'CRITICAL' as const, weight: 85 },
  { id: 'SG-CRED-010', name: 'private_key_pem', description: '-----BEGIN PRIVATE KEY----- PEM block in source', severity: 'CRITICAL' as const, weight: 95 },
];

export default function CredentialsRulesPage() {
  return (
    <RuleCategoryPage
      category="Credentials"
      categoryId="SG-CRED-*"
      description="Rules that detect hardcoded credentials, API keys, AWS access keys, GitHub tokens, PEM private keys, and patterns that log or expose secrets at runtime."
      languages={['Python', 'JavaScript', 'TypeScript', 'Shell', 'Go', 'Rust', 'Ruby']}
      rules={RULES}
    />
  );
}
