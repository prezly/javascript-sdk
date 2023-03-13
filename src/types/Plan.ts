import type { Limit } from '../endpoints/PricingTables';

import type { BillingCycle } from './BillingCycle';
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
    billing_cycle: BillingCycle;
    billing_cycle_count: number;
    currency: Currency;
    total_before_discount: number;
    total_after_discount: number;
    usage: Usage[];
    possible_changes: PlanChange[]
    ends_at: string | null;
    ended_at: string | null;
}

export interface Usage {
    limit: Limit;
    used: number;
}

export interface PlanChange {
    pricing_table_option_id: string;
    can_self_change: boolean;
    type: PlanChangeType;
}

export enum PlanChangeType {
    ACTIVATION = 'activation',
    UPGRADE = 'upgrade',
    DOWNGRADE = 'downgrade',
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
