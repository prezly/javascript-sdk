import DnsConfigurationInstruction from './DnsConfigurationInstruction';

export default interface NewsroomDomain {
    domain_name: string;
    type: 'prezly' | 'custom' | 'reverse_proxy';
    status: 'active' | 'inactive' | 'redirect';
    instructions: DnsConfigurationInstruction[];
}
