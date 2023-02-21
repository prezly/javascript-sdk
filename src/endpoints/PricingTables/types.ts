export interface PricingTable {
    options: Option[];
}

export enum BillingCycle {
    MONTH = 'month',
    YEAR = 'year',
}

export enum Currency {
    EUR = 'eur',
    USD = 'usd',
}

export enum OptionId {
    STARTER = 'starter',
    CORE = 'core',
    PREMIUM = 'premium',
}

export enum LimitDisplayName {
    STORIES = 'Stories',
    USERS = 'Users',
    SITES = 'Sites',
    CONTACTS = 'Contacts',
    EMAIL_SENDS = 'Email sends',
    CUSTOM_SENDER_ADDRESSES = 'Custom sender addresses',
}

export interface Option {
    id: `${OptionId}`;
    display_name: string | null;
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
    display_name: `${LimitDisplayName}`;
    value: null | number;
    per: null | string;
}

export interface Price {
    billing_cycle: `${BillingCycle}`;
    currency: `${Currency}`;
    unit_amount: number;
    unit: string;
}

export interface AddOn {
    id: string;
    display_name: string;
    prices: Price[];
}
