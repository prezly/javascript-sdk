import type { BillingCycle } from '../../types/BillingCycle';

export enum SignupPlan {
    STARTER = 'starter',
    CORE = 'core',
    PREMIUM = 'premium',
}

export enum SignupCurrency {
    EUR = 'eur',
    USD = 'usd',
}

export interface SignupRequest {
    email: string;
    company_name: string;
    first_name: string;
    last_name: string;
    quantity: number;
    plan?: SignupPlan;
    currency?: SignupCurrency;
    billing_cycle?: BillingCycle;
    phone?: string;
}

export interface SignupResponse {
    license_id: string;
    user_id: string;
    activation_url: string;
    activation_token: string;
}
