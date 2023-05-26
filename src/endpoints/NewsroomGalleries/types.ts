import type { NewsroomGallery, Pagination, Query, QueryString, SortOrder } from '../../types';

export interface ListOptions {
    limit?: number;
    offset?: number;
    sortOrder?: SortOrder | string;
}

export interface SearchOptions extends ListOptions {
    scope?: Query | QueryString;
    query?: Query | QueryString;
}

export interface ReorderRequest {
    order: {
        gallery: number | string;
        order: number;
    }[];
}

export interface CreateRequest {
    name: string;
    description?: string | null;
    status?: NewsroomGallery.Status;
    /**
     * Slate JSON content.
     */
    content: string;
}

export interface UpdateRequest {
    name?: string;
    description?: string | null;
    status?: NewsroomGallery.Status;
    /**
     * Slate JSON content.
     */
    content?: string;
}

export interface ListResponse {
    galleries: NewsroomGallery[];
    pagination: Pagination;
    sort: string;
}
