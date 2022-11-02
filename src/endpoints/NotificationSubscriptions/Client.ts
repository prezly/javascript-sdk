import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { NotificationSubscription } from '../../types';

import type { NotificationSubscriptionsUpdateRequest } from './types';

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async list(): Promise<NotificationSubscription[]> {
        const url = routing.notificationSubscriptionsUrl;
        const { subscriptions } = await this.apiClient.get<{
            subscriptions: NotificationSubscription[];
        }>(url);
        return subscriptions;
    }

    public async update(
        payload: NotificationSubscriptionsUpdateRequest,
    ): Promise<NotificationSubscription[]> {
        const url = routing.notificationSubscriptionsUrl;
        const { subscriptions } = await this.apiClient.patch<{
            subscriptions: NotificationSubscription[];
        }>(url, {
            payload,
        });
        return subscriptions;
    }
}
