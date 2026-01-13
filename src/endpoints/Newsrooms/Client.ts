import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Newsroom } from '../../types';
import { Query, SortOrder } from '../../types';

import type {
    CreateRequest,
    IncludeOptions,
    ListOptions,
    ListResponse,
    SearchOptions,
    UpdateRequest,
} from './types';

/**
 * Utility type to forbid arbitrary ad-hoc extensions of generic parameters.
 * @see https://stackoverflow.com/a/69666350
 */
type Exactly<Concrete, Abstract> = Concrete &
    Record<Exclude<keyof Concrete, keyof Abstract>, never>;

type InferExtraFields<T> =
    T extends Required<IncludeOptions<infer I>> ? Pick<Newsroom.ExtraFields, I> : unknown;

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list<Options extends ListOptions>(options?: Exactly<Options, ListOptions>) {
        const { search, limit, offset, sortOrder, include } = options ?? {};

        return api.get<ListResponse<Newsroom & InferExtraFields<Options>>>(routing.newsroomsUrl, {
            query: {
                limit,
                offset,
                search,
                sort: SortOrder.stringify(sortOrder),
                include: include?.join(','),
            },
        });
    }

    async function search<Options extends SearchOptions>(
        options?: Exactly<Options, SearchOptions>,
    ) {
        const { query, search, limit, offset, sortOrder, include } = options ?? {};

        // TODO: Introduce dedicated Search POST API
        return api.get<ListResponse<Newsroom & InferExtraFields<Options>>>(routing.newsroomsUrl, {
            query: {
                query: Query.stringify(query),
                limit,
                offset,
                search,
                sort: SortOrder.stringify(sortOrder),
                include: include?.join(','),
            },
        });
    }

    async function get<Options extends IncludeOptions>(
        id: Newsroom['uuid'] | Newsroom['id'],
        options?: Exactly<Options, IncludeOptions>,
    ) {
        const { include } = options ?? {};

        const { newsroom } = await api.get<{
            newsroom: Newsroom & InferExtraFields<Options>;
        }>(`${routing.newsroomsUrl}/${id}`, {
            query: {
                include: include?.join(','),
            },
        });
        return newsroom;
    }

    async function create<Options extends IncludeOptions>(
        payload: CreateRequest,
        options?: Exactly<Options, IncludeOptions>,
    ) {
        const { include } = options ?? {};
        const { newsroom } = await api.post<{
            newsroom: Newsroom & InferExtraFields<Options>;
        }>(routing.newsroomsUrl, {
            payload,
            query: {
                include: include?.join(','),
            },
        });
        return newsroom;
    }

    async function update<Options extends IncludeOptions>(
        id: Newsroom['uuid'] | Newsroom['id'],
        payload: UpdateRequest,
        options?: Exactly<Options, IncludeOptions>,
    ) {
        const { include } = options ?? {};
        const { newsroom } = await api.patch<{
            newsroom: Newsroom & InferExtraFields<Options>;
        }>(`${routing.newsroomsUrl}/${id}`, {
            payload,
            query: {
                include: include?.join(','),
            },
        });
        return newsroom;
    }

    async function archive<Options extends IncludeOptions>(
        id: Newsroom['uuid'] | Newsroom['id'],
        options?: Exactly<Options, IncludeOptions>,
    ) {
        const { include } = options ?? {};
        const { newsroom } = await api.post<{
            newsroom: Newsroom & InferExtraFields<Options>;
        }>(`${routing.newsroomsUrl}/${id}/archive`, {
            query: {
                include: include?.join(','),
            },
        });
        return newsroom;
    }

    async function unarchive<Options extends IncludeOptions>(
        id: Newsroom['uuid'] | Newsroom['id'],
        options?: Exactly<Options, IncludeOptions>,
    ) {
        const { include } = options ?? {};
        const { newsroom } = await api.post<{
            newsroom: Newsroom & InferExtraFields<Options>;
        }>(`${routing.newsroomsUrl}/${id}/unarchive`, {
            query: {
                include: include?.join(','),
            },
        });
        return newsroom;
    }

    async function takeOffline<Options extends IncludeOptions>(
        id: Newsroom['uuid'] | Newsroom['id'],
        options?: Exactly<Options, IncludeOptions>,
    ) {
        const { include } = options ?? {};
        const { newsroom } = await api.post<{
            newsroom: Newsroom & InferExtraFields<Options>;
        }>(`${routing.newsroomsUrl}/${id}/offline`, {
            query: {
                include: include?.join(','),
            },
        });
        return newsroom;
    }

    async function takeOnline<Options extends IncludeOptions>(
        id: Newsroom['uuid'] | Newsroom['id'],
        options?: Exactly<Options, IncludeOptions>,
    ) {
        const { include } = options ?? {};
        const { newsroom } = await api.post<{
            newsroom: Newsroom & InferExtraFields<Options>;
        }>(`${routing.newsroomsUrl}/${id}/online`, {
            query: {
                include: include?.join(','),
            },
        });
        return newsroom;
    }

    async function convertToHub<Options extends IncludeOptions>(
        id: Newsroom['uuid'] | Newsroom['id'],
        options?: Exactly<Options, IncludeOptions>,
    ) {
        const { include } = options ?? {};
        const { newsroom } = await api.post<{
            newsroom: Newsroom & InferExtraFields<Options>;
        }>(`${routing.newsroomsUrl}/${id}/convert`, {
            query: {
                include: include?.join(','),
            },
        });
        return newsroom;
    }

    async function deleteNewsroom(id: Newsroom['uuid'] | Newsroom['id']): Promise<void> {
        return api.delete(`${routing.newsroomsUrl}/${id}`);
    }

    return {
        list,
        search,
        get,
        create,
        update,
        archive,
        unarchive,
        delete: deleteNewsroom,
        takeOnline,
        takeOffline,
        convertToHub,
    };
}
