import { GalleryStatus, NewsroomGallery, Pagination, Query } from '../../types';

export interface ListRequest {
    scope?: Query;
    query?: Query;
    limit?: number;
    offset?: number;
    sort?: string;
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
    status?: GalleryStatus;
    /**
     * Slate JSON content.
     */
    content: string;
}

export interface UpdateRequest {
    name?: string;
    description?: string | null;
    status?: GalleryStatus;
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
