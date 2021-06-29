import { Culture, Newsroom, Pagination } from '../../types';

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
    cultures: Culture['code'][];
    default_culture?: Culture['code'];
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
    cultures?: Culture['code'][];
    default_culture?: Culture['code'];

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

    time_format?: string;
    date_format?: string;
    timezone?: string;
}
