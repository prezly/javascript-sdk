import type { NewsroomGallery, Pagination, Query } from '../../types';

export interface ListOptions {
    limit?: number;
    offset?: number;
    sortOrder?: string;
}

export interface SearchOptions extends ListOptions {
    scope?: Query;
    query?: Query;
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
