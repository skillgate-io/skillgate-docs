import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';

export const metadata: Metadata = {
  title: 'Obfuscation Rules (SG-OBF-*)',
  description: 'SkillGate detection rules for base64 payloads, encoding tricks, and anti-analysis indicators.',
};

const RULES = [
  { id: 'SG-OBF-001', name: 'base64_decode_exec', description: 'base64.b64decode() result passed to exec() or eval()', severity: 'CRITICAL' as const, weight: 95 },
  { id: 'SG-OBF-002', name: 'base64_decode', description: 'base64 decoding — may conceal payload', severity: 'MEDIUM' as const, weight: 25 },
  { id: 'SG-OBF-003', name: 'codecs_rot13', description: 'ROT13 encoding used to obscure strings', severity: 'MEDIUM' as const, weight: 20 },
  { id: 'SG-OBF-004', name: 'hex_decode_exec', description: 'Hex-decoded string passed to exec() or eval()', severity: 'CRITICAL' as const, weight: 90 },
  { id: 'SG-OBF-005', name: 'atob_eval', description: 'JavaScript atob() result passed to eval() or Function()', severity: 'CRITICAL' as const, weight: 90 },
  { id: 'SG-OBF-006', name: 'unicode_escape_exec', description: 'Unicode escape sequences used in executed string', severity: 'HIGH' as const, weight: 60 },
  { id: 'SG-OBF-007', name: 'long_base64_literal', description: 'Suspicious long base64-encoded string literal in source', severity: 'HIGH' as const, weight: 45 },
  { id: 'SG-OBF-008', name: 'zlib_decompress_exec', description: 'zlib.decompress() result passed to exec()', severity: 'CRITICAL' as const, weight: 95 },
];

export default function ObfuscationRulesPage() {
  return (
    <RuleCategoryPage
      category="Obfuscation"
      categoryId="SG-OBF-*"
      description="Rules that detect base64-encoded payloads, hex encoding, ROT13, and other obfuscation techniques used to hide malicious code from static analysis."
      languages={['Python', 'JavaScript', 'TypeScript', 'Shell']}
      rules={RULES}
    />
  );
}
