export interface LicenseRef {
    id: number;
    display_name: string;
    is_operable: boolean;
    is_locked: boolean;
    is_sso_required: boolean;
    avatar_url: string;
    status: License.Status;
}

export interface License extends LicenseRef {
    created_at: string;
}

export namespace License {
    export enum Status {
        TRIAL = 'trial',
        ACTIVE = 'active',
        PAST_DUE = 'past_due',
        PAYMENT_COLLECTION_PAUSED = 'payment_collection_paused',
        INACTIVE = 'inactive',
        CANCELED = 'canceled',
        UNPAID = 'unpaid',
    }
}
