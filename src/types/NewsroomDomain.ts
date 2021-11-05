import { DnsConfigurationInstruction } from './DnsConfigurationInstruction';

export interface NewsroomDomain {
    domain_name: string;
    type: 'prezly' | 'custom' | 'reverse_proxy';
    status: 'active' | 'inactive' | 'redirect';
    instructions: DnsConfigurationInstruction[];
}
