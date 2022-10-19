import type { DnsConfigurationInstruction } from './DnsConfigurationInstruction';

export interface NewsroomDomain {
    domain_name: string;
    type: 'prezly' | 'custom' | 'reverse_proxy';
    status: 'active' | 'inactive' | 'redirect';
    instructions: DnsConfigurationInstruction[];
}

export namespace NewsroomDomain {
    export interface ShareInstructions {
        url: string;
        expires_at: string;
    }
}
