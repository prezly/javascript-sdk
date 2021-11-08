export type DnsRecordType = 'mx' | 'txt' | 'cname';

export interface DnsConfigurationInstruction {
    domain_name: string;
    type: DnsRecordType;
    recommended_value: string | null;
    is_valid: boolean | null;
}
