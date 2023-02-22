import type { Limit } from '../endpoints/PricingTables';

export interface Plan {
    display_name: string;
    description: string | null;
    is_legacy: boolean;
    is_deprecated: boolean;
    is_superior: boolean;
    is_trial: boolean;
    pricing_table_option_id: string | null;
    billing_cycle: string;
    currency: string;
    ends_at: string | null;
    discount: Discount | null;
    usage: Usage[];
}

export interface Discount {
    amount_off: number;
    percent_off: number;
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
