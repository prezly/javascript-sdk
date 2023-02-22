export interface PricingTable {
    options: Option[];
}

export interface Option {
    id: string;
    display_name: string;
    description: string | null;
    overview_features_list: PlanFeatureRef[];
    limits: Limit[];
    prices: Price[];
    add_ons: AddOn[];
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
