
import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Newsroom } from '../../types';

import type { CreateRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

/**
 * @deprecated Use Subscriptions instead
 */
export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async subscribe(newsroomId: NewsroomId, payload: CreateRequest): Promise<void> {
        const url = routing.newsroomSubscriptionsUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.post(url, {
            payload,
        });
    }
}
