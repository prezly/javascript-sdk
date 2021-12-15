import { LicenseStatus } from './LicenseStatus';

export interface License {
    id: number;
    display_name: string;
    status: LicenseStatus;
    created_at: string;
}