import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Newsroom } from '../../types';
import { SortOrder } from '../../types';

import type { CreateRequest, ListOptions, ListResponse } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    /**
     * @deprecated Use `subscribeToNewsroom` from `Subscriptions` instead
     */
    async function subscribe(newsroomId: NewsroomId, payload: CreateRequest): Promise<void> {
        const url = generateUrl(newsroomId);
        return api.post(url, {
            payload,
        });
    }

    async function list(
        newsroomId: NewsroomId,
        { limit, offset, search, sortOrder }: ListOptions = {},
    ): Promise<ListResponse> {
        const url = generateUrl(newsroomId);
        return api.get<ListResponse>(url, {
            query: {
                limit,
                offset,
                search,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async function doExport(newsroomId: NewsroomId): Promise<{ downloadUrl: string }> {
        const url = generateUrl(newsroomId, '/export');
        const response = await api.post<{ download_url: string }>(url);
        return { downloadUrl: response.download_url };
    }

    return {
        subscribe,
        list,
        export: doExport,
    };
}

function generateUrl(newsroomId: NewsroomId, suffix = '') {
    const url = routing.newsroomSubscriptionsUrl.replace(':newsroom_id', String(newsroomId));
    return url + suffix;
}
