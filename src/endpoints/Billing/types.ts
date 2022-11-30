export interface SignupRequest {
    email: string;
    company_name: string;
    first_name: string;
    last_name: string;
    quantity: number;
    plan?: 'core';
    currency?: 'eur';
    billing_cycle?: 'month';
    phone?: string;
}

export interface SignupResponse {
    license_id: string;
    user_id: string;
    activation_url: string;
    activation_token: string;
}
