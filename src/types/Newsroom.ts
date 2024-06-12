import type { UploadedImage } from '@prezly/uploads';

import type { CultureRef } from './Culture';

export interface NewsroomRef {
    uuid: string;
    /**
     * @deprecated Please use `uuid` instead.
     * @see uuid
     */
    id: number;
    display_name: string;
    thumbnail_url: string;
    name: string;
    subdomain: string;

    status: Newsroom.Status;
    /**
     * @deprecated Please use `status` instead
     * @see status
     */
    is_active: boolean;
    /**
     * @deprecated Please use `status` instead
     * @see status
     */
    is_archived: boolean;
    is_multilingual: boolean;
    is_indexable: boolean;

    /**
     * Timezone name in the ICANN tz database.
     */
    timezone: string;
    /**
     * Moment.js time format.
     */
    time_format: string;
    /**
     * Moment.js date format.
     */
    date_format: string;

    /**
     * @deprecated Please use `is_online` instead.
     * @see is_online
     */
    is_offline: boolean;
    is_online: boolean;
    url: string;
    /**
     * @deprecated Do not rely on these.
     */
    links: {
        media_gallery_api: string;
        analytics_and_visibility_settings: string;
        categories_management: string;
        company_info_settings: string;
        contacts_management: string;
        domain_settings: string;
        edit: string;
        gallery_management: string;
        hub_settings: string;
        languages: string;
        look_and_feel_settings: string;
        /**
         * @deprecated
         */
        manual_subscription_management: string;
        privacy_settings: string;
        widget_settings: string;
    };
}

export interface Newsroom extends NewsroomRef {
    domain: string;
    is_hub: boolean;
    // extended details
    cultures: CultureRef[];
    campaigns_number: number;
    stories_number: number;
    pitches_number: number;
    coverage_number: number;
    public_galleries_number: number;
    // assets
    square_logo: UploadedImage | null;
    newsroom_logo: UploadedImage | null;
    icon: UploadedImage | null;
    email_logo: UploadedImage | null;
    email_logo_alignment: Newsroom.EmailLogoAlignment;

    email_branding_mode: Newsroom.EmailBrandingMode;
    email_branding: Newsroom.EmailBranding;

    is_privacy_portal_enabled: boolean;
    custom_privacy_policy_link: string | null;
    custom_data_request_link: string | null;

    tracking_policy: Newsroom.TrackingPolicy;
    onetrust_cookie_consent: {
        is_enabled: boolean;
        category: string;
        script: string;
    };
    google_analytics_id: string | null;
    /**
     * @deprecated Please use `google_analytics_id` instead.
     * @see google_analytics_id
     */
    ga_tracking_id: string | null;
    google_search_console_key: string | null;
    segment_analytics_id: string | null;

    is_subscription_form_enabled: boolean;
    auto_create_contacts_from_subscribers: boolean;
    is_white_labeled: boolean;

    is_plausible_enabled: boolean;
    plausible_site_id: string;
    /**
     * Present when user has permission
     */
    plausible_shared_link?: string | null;
    default_plausible_dashboard_page?: string | null;
    plausible_stats: {
        visits_last_7_days: number | null;
        visits_last_7_days_previous: number | null;
    };
    is_demo: boolean;
}

export namespace Newsroom {
    export enum Status {
        ACTIVE = 'active', // i.e. "Live"
        INACTIVE = 'inactive', // i.e. "Not live"
        ARCHIVED = 'archived',
    }

    export interface EmailBranding {
        background_color: string;
        header_background_color: string;
        header_link_color: string;
        title_color: string;
        text_color: string;
        link_color: string;
        /** @deprecated This is not used in email styling */
        link_hover_color?: string;
    }

    export enum EmailBrandingMode {
        DEFAULT = 'default',
        CUSTOM = 'custom',
    }

    export enum TrackingPolicy {
        DEFAULT = 'default',
        DISABLED = 'disabled',
        CONSENT_TO_IDENTIFY = 'consent-to-identify',
    }

    export enum EmailLogoAlignment {
        LEFT = 'left',
        CENTER = 'center',
        RIGHT = 'right',
    }

    /*
     * Status checks
     */

    export function isActive(newsroom: Newsroom['status']): boolean;
    export function isActive(newsroom: Pick<Newsroom, 'status'>): boolean;
    export function isActive(arg: Newsroom['status'] | Pick<Newsroom, 'status'>): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return isActive(arg.status);
        }
        return arg === Status.ACTIVE;
    }

    export function isInactive(newsroom: Newsroom['status']): boolean;
    export function isInactive(newsroom: Pick<Newsroom, 'status'>): boolean;
    export function isInactive(arg: Newsroom['status'] | Pick<Newsroom, 'status'>): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return isInactive(arg.status);
        }
        return arg === Status.INACTIVE;
    }

    export function isArchived(newsroom: Newsroom['status']): boolean;
    export function isArchived(newsroom: Pick<Newsroom, 'status'>): boolean;
    export function isArchived(arg: Newsroom['status'] | Pick<Newsroom, 'status'>): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return isArchived(arg.status);
        }
        return arg === Status.ARCHIVED;
    }
}
