import { SenderDomain } from './SenderDomain';

export enum SenderAddressType {
    CUSTOM = 'custom',
    PREZLYMAIL = 'prezly_mail',
}

export interface SenderAddress {
    id: number;
    sender_email: string;
    sender_name: string;
    type: SenderAddressType;
    is_default: boolean;
    is_public_webmail: boolean;
    domain: SenderDomain;
}
