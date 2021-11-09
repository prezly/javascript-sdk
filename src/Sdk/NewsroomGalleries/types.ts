import { NewsroomGallery, Pagination, Query } from '../../types';

export interface NewsroomGalleriesListRequest {
    scope?: Query;
    query?: Query;
    limit?: number;
    offset?: number;
    sort?: string;
}

export interface NewsroomGalleriesListResponse {
    galleries: NewsroomGallery[];
    pagination: Pagination;
    sort: string;
}
