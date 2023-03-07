import type { Limit } from '../endpoints/PricingTables';

export interface PlanReference {
    display_name: string;
    description: string | null;
    is_legacy: boolean;
    is_deprecated: boolean;
    is_superior: boolean;
    is_trial: boolean;
    is_agency: boolean;
    can_upgrade: boolean;
    can_self_upgrade: boolean;
    pricing_table_option_id: string | null;
}

export interface Plan extends PlanReference {
    billing_cycle: string;
    currency: string;
    usage: Usage[];
}

export interface Usage {
    limit: Limit;
    used: number;
}

/** @deprecated Will be dropped in future */
export enum PlanLevel {
    BASIC = 'basic',
    CORE = 'core',
    ENTERPRISE = 'enterprise',
    EXPERT = 'expert',
    NONE = '',
    PREMIUM = 'premium',
    PROFESSIONAL = 'professional',
    STARTER = 'starter',
    AGENCY_SMALL = 'agency_small',
    AGENCY_MEDIUM = 'agency_medium',
    AGENCY_LARGE = 'agency_large',
    AGENCY_HUGE = 'agency_huge',
}
