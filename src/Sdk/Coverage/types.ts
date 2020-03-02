import { Contact, Coverage, Pagination, RoomRef, Story } from '../../types';

export interface CoverageUpdateRequest {
    attachment_oembed?: OEmbedInfo | null;
    attachment_plaintext_content?: string | null;
    attachment?: string | null;
    author?: Contact['id'] | string | null;
    external_reference_id?: string;
    headline?: string;
    newsroom?: RoomRef['id'] | null;
    note_content?: string | { json: string } | { text: string };
    organisation?: Contact['id'] | string | null;
    original_metadata_source?: string;
    published_at?: string | null;
    story?: Story['id'] | null;
    url?: string | null;
}

export interface CoverageCreateRequest extends CoverageUpdateRequest {}

export interface CoverageSearchOptions {
    includeDeleted?: boolean;
    jsonQuery?: string;
    page?: number;
    pageSize?: number;
    sortOrder?: string;
}

export interface CoverageListResponse {
    coverage: Coverage[];
    pagination: Pagination;
    sort: string;
}

export interface OEmbedInfo {
    version: '1.0';
    url: string;
    type: 'video' | 'photo' | 'rich' | 'link';
    // generic properties
    title?: string;
    description?: string;
    thumbnail_url?: string;
    thumbnail_width?: string;
    thumbnail_height?: string;
    author_name?: string;
    author_url?: string;
    provider_name?: string;
    provider_url?: string;
    cache_age?: number;
    // video, photo & rich types
    html?: string;
    width?: number;
    height?: number;
}
