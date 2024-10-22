import type { Limit } from '../endpoints/PricingTables';
import type { OptionId } from '../endpoints/PricingTables';
import type { TableId } from '../endpoints/PricingTables';

import type { BillingCycle } from './BillingCycle';
import type { Currency } from './Currency';
import type { TiersMode, BillingSchema, Tier } from './Price';

export interface PlanReference {
    display_name: string;
    description: string | null;
    is_legacy: boolean;
    is_deprecated: boolean;
    is_superior: boolean;
    is_trial: boolean;
    can_upgrade: boolean;
    pricing_table_id: TableId | null;
    pricing_table_option_id: OptionId | null;
}

export interface Plan extends PlanReference {
    billing_cycle: BillingCycle;
    billing_cycle_count: number;
    currency: Currency;
    subtotal_before_discount: number;
    subtotal_after_discount: number;
    total_before_discount: number;
    total_after_discount: number;
    usage: Usage[];
    possible_changes: Change[];
    add_ons: PlanAddOn[];
    ends_at: string | null;
    ended_at: string | null;
    current_period_end: string | null;
}

export interface PlanAddOn {
    add_on: AddOn;
    quantity: number;
}

export interface AddOn {
    id: string;
    display_name: string;
    prices: PricingPlan[];
}

export interface PricingPlan {
    billing_cycle: BillingCycle;
    currency: Currency;
    billing_scheme: BillingSchema;
    amount: number | null;
    unit: string | null;
    tiers_mode: TiersMode | null;
    tiers: Tier[] | null;
}

export interface Usage {
    limit: Limit;
    used: number;
}

export interface Change {
    pricing_table_id: TableId;
    pricing_table_option_id: OptionId;
    can_self_change: boolean;
    type: ChangeType;
}

export enum ChangeType {
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
