import { Contact, Coverage, NewsroomRef, OEmbedInfo, Pagination, Story } from '../../types';

export interface CoverageUpdateRequest {
    attachment_oembed?: OEmbedInfo | null;
    attachment_plaintext_content?: string | null;
    attachment?: string | null;
    author?: Contact['id'] | string | null;
    external_reference_id?: string;
    headline?: string;
    newsroom?: NewsroomRef['id'] | null;
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
