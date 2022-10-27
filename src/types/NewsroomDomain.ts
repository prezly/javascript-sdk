import type { DnsConfigurationInstruction } from './DnsConfigurationInstruction';

export interface NewsroomDomain {
    domain_name: string;
    type: NewsroomDomain.Type;
    status: NewsroomDomain.Status;
    instructions: DnsConfigurationInstruction[];
}

export namespace NewsroomDomain {
    export enum Type {
        PREZLY = 'prezly',
        CUSTOM = 'custom',
        REVERSE_PROXY = 'reverse_proxy',
    }

    export enum Status {
        ACTIVE = 'active',
        INACTIVE = 'inactive',
        REDIRECT = 'redirect',
    }

    export interface ShareInstructions {
        url: string;
        expires_at: string;
    }
}
