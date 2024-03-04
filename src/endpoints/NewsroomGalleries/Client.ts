import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import { Query, SortOrder } from '../../types';
import type { Newsroom, NewsroomGallery } from '../../types';

import type {
    ListOptions,
    ListResponse,
    ReorderRequest,
    CreateRequest,
    UpdateRequest,
    SearchOptions,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];
type GalleryId = NewsroomGallery['uuid'] | NewsroomGallery['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function get(
        newsroomId: NewsroomId,
        id: NewsroomGallery['uuid'],
    ): Promise<NewsroomGallery> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await api.get<{ gallery: NewsroomGallery }>(`${url}/${id}`);

        return response.gallery;
    }

    async function list(newsroomId: NewsroomId, options: ListOptions = {}): Promise<ListResponse> {
        const { sortOrder, limit, offset } = options;
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        return api.get<ListResponse>(url, {
            query: {
                sort: SortOrder.stringify(sortOrder),
                limit: limit,
                offset: offset,
            },
        });
    }

    async function search(
        newsroomId: NewsroomId,
        options: SearchOptions = {},
    ): Promise<ListResponse> {
        const { scope, query, sortOrder, limit, offset } = options;
        // TODO: Introduce dedicated Search POST API
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        return api.get<ListResponse>(url, {
            query: {
                scope: Query.stringify(scope),
                query: Query.stringify(query),
                sort: SortOrder.stringify(sortOrder),
                limit: limit,
                offset: offset,
            },
        });
    }

    async function order(newsroomId: NewsroomId, payload: ReorderRequest): Promise<void> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        api.post(`${url}/order`, {
            payload,
        });
    }

    async function create(
        newsroomId: NewsroomId,
        payload: CreateRequest,
    ): Promise<NewsroomGallery> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const { gallery } = await api.post<{ gallery: NewsroomGallery }>(url, {
            payload,
        });
        return gallery;
    }

    async function update(
        newsroomId: NewsroomId,
        galleryId: GalleryId,
        payload: UpdateRequest,
    ): Promise<NewsroomGallery> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const { gallery } = await api.patch<{ gallery: NewsroomGallery }>(`${url}/${galleryId}`, {
            payload,
        });
        return gallery;
    }

    async function doDelete(newsroomId: NewsroomId, galleryId: GalleryId): Promise<void> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        return api.delete(`${url}/${galleryId}`);
    }

    return {
        get,
        list,
        search,
        order,
        create,
        update,
        delete: doDelete,
    };
}
