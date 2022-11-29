export interface SignupRequest {
    email: string;
    company_name: string;
    first_name: string;
    last_name: string;
}

export interface SignupResponse {
    activation_url: string;
}
