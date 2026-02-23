import type { Metadata } from 'next';
import { RuleCategoryPage } from '@/components/ui/RuleCategoryPage';

export const metadata: Metadata = {
  title: 'Network Rules (SG-NET-*)',
  description: 'SkillGate detection rules for network egress, DNS, HTTP callbacks, and data exfiltration.',
};

const RULES = [
  { id: 'SG-NET-001', name: 'urllib_request', description: 'urllib.request used for outbound HTTP connection', severity: 'MEDIUM' as const, weight: 25 },
  { id: 'SG-NET-002', name: 'requests_get_post', description: 'requests library making outbound HTTP calls', severity: 'MEDIUM' as const, weight: 25 },
  { id: 'SG-NET-003', name: 'httpx_async', description: 'httpx async client making outbound HTTP calls', severity: 'MEDIUM' as const, weight: 25 },
  { id: 'SG-NET-004', name: 'raw_socket', description: 'Raw socket connection opened (potential exfiltration)', severity: 'HIGH' as const, weight: 55 },
  { id: 'SG-NET-005', name: 'dns_lookup', description: 'DNS lookup that may exfiltrate data via subdomain', severity: 'HIGH' as const, weight: 50 },
  { id: 'SG-NET-006', name: 'ftplib', description: 'FTP connection for potential data exfiltration', severity: 'HIGH' as const, weight: 55 },
  { id: 'SG-NET-007', name: 'smtplib', description: 'SMTP connection that may send email with exfiltrated data', severity: 'HIGH' as const, weight: 55 },
  { id: 'SG-NET-008', name: 'paramiko_ssh', description: 'SSH connection via paramiko for remote access', severity: 'CRITICAL' as const, weight: 70 },
  { id: 'SG-NET-010', name: 'fetch_api', description: 'Browser/Node fetch() outbound HTTP request', severity: 'MEDIUM' as const, weight: 20 },
  { id: 'SG-NET-011', name: 'axios_request', description: 'Axios library making outbound HTTP calls', severity: 'MEDIUM' as const, weight: 20 },
  { id: 'SG-NET-012', name: 'websocket_connect', description: 'WebSocket connection for real-time communication', severity: 'MEDIUM' as const, weight: 30 },
  { id: 'SG-NET-013', name: 'xmlhttprequest', description: 'XMLHttpRequest for outbound HTTP calls', severity: 'MEDIUM' as const, weight: 20 },
  { id: 'SG-NET-020', name: 'curl_command', description: 'curl command used in shell for outbound HTTP', severity: 'HIGH' as const, weight: 45 },
  { id: 'SG-NET-021', name: 'wget_command', description: 'wget command for outbound download', severity: 'HIGH' as const, weight: 45 },
  { id: 'SG-NET-030', name: 'go_http_client', description: 'Go net/http client making outbound calls', severity: 'MEDIUM' as const, weight: 20 },
  { id: 'SG-NET-040', name: 'rust_reqwest', description: 'Rust reqwest client making outbound HTTP calls', severity: 'MEDIUM' as const, weight: 20 },
  { id: 'SG-NET-050', name: 'ruby_net_http', description: 'Ruby Net::HTTP outbound connection', severity: 'MEDIUM' as const, weight: 20 },
];

export default function NetworkRulesPage() {
  return (
    <RuleCategoryPage
      category="Network"
      categoryId="SG-NET-*"
      description="Rules that detect network egress, DNS lookups, HTTP callbacks, raw socket connections, and data exfiltration channels."
      languages={['Python', 'JavaScript', 'TypeScript', 'Shell', 'Go', 'Rust', 'Ruby']}
      rules={RULES}
    />
  );
}
