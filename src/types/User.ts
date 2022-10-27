export interface UserRef {
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
    sign_in_flow: User.SignInFlow;
    use_case_answer: User.UseCaseAnswer | null;

    created_at: string;
    /**
     * Last time the user was active.
     */
    last_seen_at: string | null;
    locked_until: string | null;
}

export namespace User {
    export enum SignInFlow {
        GOOGLE = 'google',
        PASSWORD = 'password',
        SSO = 'sso',
    }

    export enum UseCaseAnswer {
        UNKNOWN = 'unknown',
        CAMPAIGNS = 'campaigns',
        CONTACTS = 'contacts',
        STORIES = 'stories',
        NEWSROOM = 'newsroom',
        COVERAGE = 'coverage',
        SKIP = 'skip',
    }
}
