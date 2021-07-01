export default interface DnsConfigurationInstruction {
    domain_name: string;
    type: string;
    recommended_value: string | null;
    is_valid: boolean | null;
}
