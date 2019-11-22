import { Contact, Coverage, Pagination, RoomRef, Story } from '../../types';

export interface CoverageUpdateRequest {
    attachment_plaintext_content?: string | null;
    attachment?: string | null;
    author?: Contact['id'] | string;
    external_reference_id?: string;
    newsroom?: RoomRef['id'] | null;
    note_content?: string;
    organisation?: Contact['id'] | string | null;
    original_metadata_source?: string;
    published_at?: string;
    story?: Story['id'] | null;
    url?: string | null;
}

export interface CoverageCreateRequest extends CoverageUpdateRequest {
    author: Contact['id'] | string;
}

export interface CoverageSearchOptions {
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
