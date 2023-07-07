import type { LicenseRef } from './License';
import type { NewsroomRef } from './Newsroom';
import type { Permission } from './Permissions';
import type { UserRef } from './User';

export type UserAccountRef = UserRef;

export interface UserAccount {
    id: number;
    avatar_url: string;
    country: string;
    created: string;
    date_format: string;
    display_name: string;
    email: string;
    first_name: string;

    /**
     * This field is not suitable for checking security permissions.
     * This is only indicating which permissions this user was configured access to.
     * But the actual currently granted permissions list should be obtained
     * from the UserContext object.
     */
    permissions: '*' | Permission[];
    /**
     * This field is not suitable for checking newsroom access security-wise.
     * This is only indicating which newsrooms this user was configured access to.
     * But the actual currently allowed newsrooms list should be obtained
     * from the UserContext object.
     */
    newsrooms: '*' | NewsroomRef[];

    is_accepted: boolean;
    is_active: boolean;
    show_in_menu: boolean;

    is_subscribed_to_privacy_requests: boolean;
    last_name: string;
    /**
     * Last time the user initiated a session.
     */
    last_login_at: string | null;
    /**
     * Last time the user was active.
     */
    last_seen_at: string | null;
    license: LicenseRef;
    joined_license_at: string;
    is_license_owner: boolean;
    last_seen_license_at: string | null;
    time_format: string;
    timezone_offset: string;
    timezone: string;
}
