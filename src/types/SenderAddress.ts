import type { SenderDomain } from './SenderDomain';

export interface SenderAddress {
    id: number;
    sender_email: string;
    sender_name: string;
    type: SenderAddress.Type;
    is_default: boolean;
    is_public_webmail: boolean;
    is_verified: boolean;
    is_approved: boolean;
    domain: SenderDomain;
}

export namespace SenderAddress {
    export enum Type {
        CUSTOM = 'custom',
        PREZLYMAIL = 'prezly_mail',
    }
}
