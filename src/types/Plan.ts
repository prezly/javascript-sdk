import type { Limit } from '../endpoints/PricingTables';

import type { Currency } from './Currency';

export interface PlanReference {
    display_name: string;
    description: string | null;
    is_legacy: boolean;
    is_deprecated: boolean;
    is_superior: boolean;
    is_trial: boolean;
    can_upgrade: boolean;
    pricing_table_option_id: string | null;
}

export interface Plan extends PlanReference {
    billing_cycle: PlanBillingCycle;
    billing_cycle_count: number;
    currency: Currency;
    total_before_discount: number;
    total_after_discount: number;
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

export enum PlanBillingCycle {
    YEAR = 'year',
    MONTH = 'month',
}
