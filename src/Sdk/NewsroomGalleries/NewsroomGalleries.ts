import { Newsroom } from '../../types';

import routing from '../routing';
import DeferredJobsApiClient from '../DeferredJobsApiClient';
import { NewsroomGallery } from '../../types';
import {
    NewsroomGalleriesListRequest,
    NewsroomGalleriesListResponse,
    NewsroomGalleriesOrderRequest,
    NewsroomGalleryCreateRequest,
    NewsroomGalleryUpdateRequest,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];
type GalleryId = NewsroomGallery['uuid'] | NewsroomGallery['id'];

export default class NewsroomGalleries {
    private readonly apiClient: DeferredJobsApiClient;

    constructor({ apiClient }: { apiClient: DeferredJobsApiClient }) {
        this.apiClient = apiClient;
    }

    public async get(
        newsroomId: NewsroomId,
        id: NewsroomGallery['uuid'],
    ): Promise<NewsroomGallery> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ gallery: NewsroomGallery }>(`${url}/${id}`);

        return response.gallery;
    }

    public async list(
        newsroomId: NewsroomId,
        payload: NewsroomGalleriesListRequest = {},
    ): Promise<NewsroomGalleriesListResponse> {
        const { scope, query, sort, limit, offset } = payload;
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.get<NewsroomGalleriesListResponse>(url, {
            query: {
                scope: scope ? JSON.stringify(scope) : undefined,
                query: query ? JSON.stringify(query) : undefined,
                sort: sort,
                limit: limit,
                offset: offset,
            },
        });
    }

    public async order(
        newsroomId: NewsroomId,
        payload: NewsroomGalleriesOrderRequest,
    ): Promise<void> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        this.apiClient.post(`${url}/order`, {
            payload,
        });
    }

    public async create(
        newsroomId: NewsroomId,
        payload: NewsroomGalleryCreateRequest,
    ): Promise<NewsroomGallery> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const { gallery } = await this.apiClient.post<{ gallery: NewsroomGallery }>(url, {
            payload,
        });
        return gallery;
    }

    public async update(
        newsroomId: NewsroomId,
        galleryId: GalleryId,
        payload: NewsroomGalleryUpdateRequest,
    ): Promise<NewsroomGallery> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const { gallery } = await this.apiClient.patch<{ gallery: NewsroomGallery }>(
            `${url}/${galleryId}`,
            {
                payload,
            },
        );
        return gallery;
    }

    public async remove(newsroomId: NewsroomId, galleryId: GalleryId): Promise<void> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.delete(`${url}/${galleryId}`);
    }
}
