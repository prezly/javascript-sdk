import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Newsroom } from '../../types';
import { SortOrder } from '../../types';

import type { CreateRequest, ListOptions, ListResponse } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    /**
     * @deprecated Use `subscribeToNewsroom` from `Subscriptions` instead
     */
    public async subscribe(newsroomId: NewsroomId, payload: CreateRequest): Promise<void> {
        const url = generateUrl(newsroomId);
        return this.apiClient.post(url, {
            payload,
        });
    }

    public async list(
        newsroomId: NewsroomId,
        { limit, offset, search, sortOrder }: ListOptions = {},
    ): Promise<ListResponse> {
        const url = generateUrl(newsroomId);
        return this.apiClient.get<ListResponse>(url, {
            query: {
                limit,
                offset,
                search,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    public async export(newsroomId: NewsroomId): Promise<{ downloadUrl: string }> {
        const url = generateUrl(newsroomId, '/export');
        const response = await this.apiClient.post<{ download_url: string }>(url);
        return { downloadUrl: response.download_url };
    }
}

function generateUrl(newsroomId: NewsroomId, suffix = '') {
    const url = routing.newsroomSubscriptionsUrl.replace(':newsroom_id', String(newsroomId));
    return url + suffix;
}
