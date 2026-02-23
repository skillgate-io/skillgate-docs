import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';

export const metadata: Metadata = {
  title: 'Filesystem Rules (SG-FS-*)',
  description: 'SkillGate detection rules for filesystem writes, deletes, and sensitive path access.',
};

const RULES = [
  { id: 'SG-FS-001', name: 'open_write', description: 'File opened in write mode — may modify host files', severity: 'MEDIUM' as const, weight: 25 },
  { id: 'SG-FS-002', name: 'open_append', description: 'File opened in append mode', severity: 'LOW' as const, weight: 10 },
  { id: 'SG-FS-003', name: 'shutil_rmtree', description: 'Recursive directory deletion via shutil.rmtree()', severity: 'CRITICAL' as const, weight: 80 },
  { id: 'SG-FS-004', name: 'os_remove', description: 'File deletion via os.remove()', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-FS-005', name: 'os_unlink', description: 'File deletion via os.unlink()', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-FS-006', name: 'sensitive_path_etc_passwd', description: 'Access to /etc/passwd — credential file', severity: 'CRITICAL' as const, weight: 90 },
  { id: 'SG-FS-007', name: 'sensitive_path_shadow', description: 'Access to /etc/shadow — password hash file', severity: 'CRITICAL' as const, weight: 90 },
  { id: 'SG-FS-008', name: 'sensitive_path_ssh', description: 'Access to ~/.ssh directory or key files', severity: 'CRITICAL' as const, weight: 85 },
  { id: 'SG-FS-009', name: 'sensitive_path_aws', description: 'Access to ~/.aws/credentials file', severity: 'CRITICAL' as const, weight: 85 },
  { id: 'SG-FS-010', name: 'tempfile_persist', description: 'Temporary file created but not deleted — potential data persistence', severity: 'LOW' as const, weight: 10 },
  { id: 'SG-FS-011', name: 'fs_write_sync', description: 'Node.js fs.writeFileSync() file write', severity: 'MEDIUM' as const, weight: 25 },
  { id: 'SG-FS-012', name: 'fs_unlink', description: 'Node.js fs.unlink() file deletion', severity: 'HIGH' as const, weight: 40 },
  { id: 'SG-FS-013', name: 'path_traversal', description: 'Path traversal pattern (../../../) in file path', severity: 'HIGH' as const, weight: 60 },
];

export default function FilesystemRulesPage() {
  return (
    <RuleCategoryPage
      category="Filesystem"
      categoryId="SG-FS-*"
      description="Rules that detect filesystem writes, recursive deletes, and access to sensitive host paths like /etc/passwd, ~/.ssh, and ~/.aws."
      languages={['Python', 'JavaScript', 'TypeScript', 'Shell', 'Go', 'Rust', 'Ruby']}
      rules={RULES}
    />
  );
}
