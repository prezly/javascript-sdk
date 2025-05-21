import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Newsroom } from '../../types';
import { Query, SortOrder } from '../../types';

import type {
    CreateRequest,
    ListOptions,
    ListResponse,
    SearchOptions,
    UpdateRequest,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list({
        limit,
        offset,
        search,
        sortOrder,
    }: ListOptions = {}): Promise<ListResponse> {
        return api.get<ListResponse>(routing.newsroomsUrl, {
            query: {
                limit,
                offset,
                search,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async function search(options: SearchOptions = {}): Promise<ListResponse> {
        const { query, limit, offset, search, sortOrder } = options;
        // TODO: Introduce dedicated Search POST API
        return api.get<ListResponse>(routing.newsroomsUrl, {
            query: {
                query: Query.stringify(query),
                limit,
                offset,
                search,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async function get(id: NewsroomId): Promise<Newsroom> {
        const { newsroom } = await api.get<{ newsroom: Newsroom }>(`${routing.newsroomsUrl}/${id}`);
        return newsroom;
    }

    async function create(payload: CreateRequest): Promise<Newsroom> {
        const { newsroom } = await api.post<{ newsroom: Newsroom }>(routing.newsroomsUrl, {
            payload,
        });
        return newsroom;
    }

    async function update(id: NewsroomId, payload: UpdateRequest): Promise<Newsroom> {
        const { newsroom } = await api.patch<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}`,
            {
                payload,
            },
        );
        return newsroom;
    }

    async function archive(id: NewsroomId): Promise<Newsroom> {
        const { newsroom } = await api.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/archive`,
        );
        return newsroom;
    }

    async function unarchive(id: NewsroomId): Promise<Newsroom> {
        const { newsroom } = await api.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/unarchive`,
        );
        return newsroom;
    }

    async function doDelete(id: NewsroomId): Promise<void> {
        return api.delete(`${routing.newsroomsUrl}/${id}`);
    }

    async function takeOffline(id: NewsroomId): Promise<Newsroom> {
        const { newsroom } = await api.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/offline`,
        );
        return newsroom;
    }

    async function takeOnline(id: NewsroomId): Promise<Newsroom> {
        const { newsroom } = await api.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/online`,
        );
        return newsroom;
    }

    async function convert(id: NewsroomId): Promise<Newsroom> {
        const { newsroom } = await api.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/convert`,
        );
        return newsroom;
    }

    return {
        list,
        search,
        get,
        create,
        update,
        archive,
        unarchive,
        delete: doDelete,
        takeOnline,
        takeOffline,
        convert,
    };
}
