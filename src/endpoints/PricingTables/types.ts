export interface PricingTable {
    options: Option[];
    rows: Row[];
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
    id: string;
    display_name: string;
    value: null | number;
    per: null | string;
}

export interface Price {
    billing_cycle: string;
    currency: string;
    amount: number;
    unit: string | null;
}

export interface AddOn {
    id: string;
    display_name: string;
    prices: Price[];
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

export interface Cell {
    value: string | null;
    description: string | null;
}
