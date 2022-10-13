import { LicenseStatus } from './LicenseStatus';

export interface LicenseRef {
    id: number;
    display_name: string;
    is_operable: boolean;
    is_locked: boolean;
    is_sso_required: boolean;
    avatar_url: string;
    status: LicenseStatus;
}

export interface License extends LicenseRef {
    created_at: string;
}
