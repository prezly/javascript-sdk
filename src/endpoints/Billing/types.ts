export enum SignupPlan {
    STARTER = 'starter',
    CORE = 'core',
    PREMIUM = 'premium',
}

export enum SignupCurrencies {
    EUR = 'eur',
    USD = 'usd',
}

export enum SignupBillingCycles {
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
    currency?: SignupCurrencies;
    billing_cycle?: SignupBillingCycles;
    phone?: string;
}

export interface SignupResponse {
    license_id: string;
    user_id: string;
    activation_url: string;
    activation_token: string;
}
