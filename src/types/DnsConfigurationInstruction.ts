export type DnsRecordType = 'mx' | 'txt' | 'cname';

export default interface DnsConfigurationInstruction {
    domain_name: string;
    type: DnsRecordType;
    recommended_value: string | null;
    is_valid: boolean | null;
}
