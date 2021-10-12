import { CultureRef, EmailBranding, EmailBrandingMode, Newsroom, Pagination } from '../../types';

export interface NewsroomListRequest {
    limit?: number;
    offset?: number;
    /**
     * Text search keyword.
     */
    search?: string;
    sortOrder?: string;
}

export interface NewsroomSearchRequest extends NewsroomListRequest {
    /**
     * Filter query using Prezly JSON Query Language
     */
    jsonQuery?: string;
}

export interface NewsroomListResponse {
    newsrooms: Newsroom[];
    pagination: Pagination;
    sort: string;
}

export interface NewsroomCreateRequest {
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
}

export interface NewsroomUpdateRequest {
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

    email_branding_mode?: EmailBrandingMode;
    email_branding?: EmailBranding;
}
