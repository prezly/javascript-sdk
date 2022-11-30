export enum SignupPlan {
    STARTER = 'starter',
    CORE = 'core',
    PREMIUM = 'premium',
}

export enum SignupCurrency {
    EUR = 'eur',
    USD = 'usd',
}

export enum SignupBillingCycle {
    YEAR = 'year',
    MONTH = 'month',
}

export interface SignupRequest {
    email: string;
    company_name: string;
    first_name: string;
    last_name: string;
    quantity: number;
    plan?: SignupPlan;
    currency?: SignupCurrency;
    billing_cycle?: SignupBillingCycle;
    phone?: string;
}

export interface SignupResponse {
    license_id: string;
    user_id: string;
    activation_url: string;
    activation_token: string;
}
