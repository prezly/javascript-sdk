import type { DnsConfigurationInstruction } from './DnsConfigurationInstruction';

export interface SenderDomain {
    domain_name: string;
    /**
     * Whether all required DNS records are properly set.
     */
    is_valid: boolean;
    /**
     * Indicate whether it's a known public email service domain.
     * Such domains cannot be verified to be used in Prezly.
     */
    is_public_webmail: boolean;
    /**
     * Indicate whether this sending domain is a Prezly-maintained .prezlymail.com subdomain.
     */
    is_prezlymail: boolean;
    /**
     * Indicate whether there's a newer/better domain verification setup.
     * Upgrading to the newer setup would mean higher delivery rate.
     */
    is_upgrade_recommended: boolean;
    /**
     * There were different verification setups we've been using over the years.
     * The latest one, which is also the best so far, is `v3`.
     */
    verification_flow_version: SenderDomain.VerificationFlowVersion | null;
}

export namespace SenderDomain {
    export enum VerificationFlowVersion {
        V1 = 'v1',
        V2 = 'v2',
        V3 = 'v3',
        PREZLYMAIL = 'prezlymail',
    }

    export interface Configuration {
        domain: SenderDomain;
        dns: Record<VerificationFlowVersion, DnsConfigurationInstruction[]>;
    }
}
