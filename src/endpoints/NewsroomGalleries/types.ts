import { GalleryStatus, NewsroomGallery, Pagination, Query } from '../../types';

export interface NewsroomGalleriesListRequest {
    scope?: Query;
    query?: Query;
    limit?: number;
    offset?: number;
    sort?: string;
}

export interface NewsroomGalleriesOrderRequest {
    order: {
        gallery: number | string;
        order: number;
    }[];
}

export interface NewsroomGalleryCreateRequest {
    name: string;
    description?: string | null;
    status?: GalleryStatus;
    /**
     * Slate JSON content.
     */
    content: string;
}

export interface NewsroomGalleryUpdateRequest {
    name?: string;
    description?: string | null;
    status?: GalleryStatus;
    /**
     * Slate JSON content.
     */
    content?: string;
}

export interface NewsroomGalleriesListResponse {
    galleries: NewsroomGallery[];
    pagination: Pagination;
    sort: string;
}
