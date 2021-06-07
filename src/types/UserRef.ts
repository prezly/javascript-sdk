export default interface UserRef {
    id: number;
    display_name: string;
    avatar_url: string;
    /**
     * @deprecated Please use `email` instead.
     * @see email
     */
    username: string;
    email: string;
    first_name: string;
    last_name: string;

    is_terms_of_service_accepted: boolean;
    sign_in_flow: 'google' | 'password' | 'sso';
    use_case_answer: string;

    created_at: string;
    last_seen_at: string | null;
}
