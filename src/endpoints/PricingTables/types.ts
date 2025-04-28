import type { PricingPlan } from '../../types';

export interface PricingTable {
    id: TableId;
    options: Option[];
    rows: Row[];
}

export enum TableId {
    STANDARD = 'standard',
    AGENCY = 'agency',
}

export interface Option {
    id: OptionId;
    display_name: string;
    description: string | null;
    overview_features_list: PlanFeatureRef[];
    limits: Limit[];
    prices: Price[];
    add_ons: AddOn[];
}

export enum OptionId {
    STARTER = 'starter',
    CORE = 'core',
    PREMIUM = 'premium',
    AGENCY_STARTER = 'agency_starter',
    AGENCY_SMALL = 'agency_small',
    AGENCY_MEDIUM = 'agency_medium',
    AGENCY_LARGE = 'agency_large',
    AGENCY_HUGE = 'agency_huge',
}

export interface PlanFeatureRef {
    name: string;
    details?: string;
}

export interface Limit {
    id: LimitId;
    display_name: string;
    value: null | number;
    per: null | string;
}

export enum LimitId {
    STORIES = 'stories',
    USERS = 'users',
    SITES = 'sites',
    CONTACTS = 'contacts',
    EMAIL_SENDS = 'email_sends',
    CUSTOM_SENDER_ADDRESSES = 'custom_sender_addresses',
}

export interface Price {
    billing_cycle: string;
    currency: string;
    amount: number;
    unit: string | null;
}

export interface AddOn {
    id: AddOnId;
    display_name: string;
    prices: Price[];
}

export enum AddOnId {
    SITE = 'site',
}

export interface Row {
    display_name: string;
    description: string | null;
    link: string | null;
    area: string | null;
    status: 'beta' | null;
    is_key_item: boolean;
    cells: Record<string, Cell>;
}

export enum CellType {
    TEXT = 'text',
    PRICING = 'pricing',
}

export interface Cell {
    type: CellType;
    value: string | PricingPlan[] | null;
    description: string | null;
}
