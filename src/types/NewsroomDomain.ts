import DnsConfigurationInstruction from './DnsConfigurationInstruction';

export default interface NewsroomDomain {
    domain_name: string;
    type: 'prezly' | 'custom';
    status: 'active' | 'inactive' | 'redirect';
    instructions: DnsConfigurationInstruction[];
}
