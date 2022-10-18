import { Newsroom } from '../../types';

import DeferredJobsApiClient from '../DeferredJobsApiClient';
import routing from '../routing';

import { NewsroomSubscriptionCreateRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

/**
 * @deprecated Use Subscriptions instead
 */
export default class NewsroomSubscriptions {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async subscribe(
        newsroomId: NewsroomId,
        payload: NewsroomSubscriptionCreateRequest,
    ): Promise<void> {
        const url = routing.newsroomSubscriptionsUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.post(url, {
            payload,
        });
    }
}
