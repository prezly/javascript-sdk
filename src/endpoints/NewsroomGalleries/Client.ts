import { Newsroom, Query } from '../../types';

import { routing } from '../../routing';
import { DeferredJobsApiClient } from '../../api';
import { NewsroomGallery } from '../../types';
import {
    ListOptions,
    ListResponse,
    ReorderRequest,
    CreateRequest,
    UpdateRequest,
    SearchOptions,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];
type GalleryId = NewsroomGallery['uuid'] | NewsroomGallery['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
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

    public async list(newsroomId: NewsroomId, options: ListOptions = {}): Promise<ListResponse> {
        const { sortOrder, limit, offset } = options;
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.get<ListResponse>(url, {
            query: {
                sort: sortOrder,
                limit: limit,
                offset: offset,
            },
        });
    }

    public async search(
        newsroomId: NewsroomId,
        options: SearchOptions = {},
    ): Promise<ListResponse> {
        const { scope, query, sortOrder, limit, offset } = options;
        // TODO: Introduce dedicated Search POST API
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.get<ListResponse>(url, {
            query: {
                scope: Query.stringify(scope),
                query: Query.stringify(query),
                sort: sortOrder,
                limit: limit,
                offset: offset,
            },
        });
    }

    public async order(newsroomId: NewsroomId, payload: ReorderRequest): Promise<void> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        this.apiClient.post(`${url}/order`, {
            payload,
        });
    }

    public async create(newsroomId: NewsroomId, payload: CreateRequest): Promise<NewsroomGallery> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const { gallery } = await this.apiClient.post<{ gallery: NewsroomGallery }>(url, {
            payload,
        });
        return gallery;
    }

    public async update(
        newsroomId: NewsroomId,
        galleryId: GalleryId,
        payload: UpdateRequest,
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
