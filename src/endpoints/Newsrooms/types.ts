import type { CultureRef, Newsroom, Pagination, Query, SortOrder } from '../../types';

export interface ListOptions {
    limit?: number;
    offset?: number;
    /**
     * Text search keyword.
     */
    search?: string;
    sortOrder?: SortOrder | string;
}

export interface SearchOptions extends ListOptions {
    /**
     * Filter query using Prezly JSON Query Language
     */
    query?: Query;
}

export interface ListResponse {
    newsrooms: Newsroom[];
    pagination: Pagination;
    sort: string;
}

export interface CreateRequest {
    name: string;
    /**
     * Subdomain to be used for the newsroom.
     * {subdomain}.prezly.com
     */
    subdomain: string;
    cultures: CultureRef['code'][];
    default_culture?: CultureRef['code'];
    /**
     * Uploadcare Image JSON
     */
    newsroom_logo?: string;
    /**
     * Uploadcare Image JSON
     */
    square_logo?: string;
    /**
     * Theme ID or codename
     */
    active_theme?: string;
    status?: Newsroom.Status.ACTIVE | Newsroom.Status.INACTIVE;
    // Populate newsroom with example content
    with_demo_content?: boolean;
}

export interface UpdateRequest {
    name?: string;
    /**
     * Subdomain to be used for the newsroom.
     * {subdomain}.prezly.com
     */
    subdomain?: string;
    cultures?: CultureRef['code'][];
    default_culture?: CultureRef['code'];

    is_indexable?: boolean;

    /**
     * Uploadcare Image JSON
     */
    newsroom_logo?: string;
    /**
     * Uploadcare Image JSON
     */
    square_logo?: string;
    /**
     * Uploadcare Image JSON
     */
    icon?: string;

    google_search_console_key?: string | null;
    google_analytics_id?: string | null;
    segment_analytics_id?: string | null;

    /**
     * Accepts valid PHP or Moment.js time formats.
     */
    time_format?: string;
    /**
     * Accepts "ampm" or "24" or valid PHP time formats ("h:i a", "H:i")
     * or valid Moment.js time formats ("hh:mm a", "HH:mm")
     */
    date_format?: string;
    /**
     * Timezone name in the ICANN tz database.
     */
    timezone?: string;

    email_branding_mode?: Newsroom.EmailBrandingMode;
    email_branding?: Newsroom.EmailBranding;

    is_privacy_portal_enabled?: boolean;
    /**
     * Available only when license has
     * "custom_privacy_policy_link" feature flag
     */
    custom_privacy_policy_link?: string | null;
    /**
     * Available only when license has
     * "custom_data_request_link" feature flag
     */
    custom_data_request_link?: string | null;
    /**
     * Available only when license has
     * "subscription_form" feature flag
     */
    is_subscription_form_enabled?: boolean;
    status?: Newsroom.Status.ACTIVE | Newsroom.Status.INACTIVE;

    is_plausible_enabled?: boolean;
}
