import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { NotificationSubscription } from '../../types';

import type { UpdateRequest } from './types';

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(): Promise<NotificationSubscription[]> {
        const url = routing.notificationSubscriptionsUrl;
        const { subscriptions } = await api.get<{
            subscriptions: NotificationSubscription[];
        }>(url);
        return subscriptions;
    }

    async function update(payload: UpdateRequest): Promise<NotificationSubscription[]> {
        const url = routing.notificationSubscriptionsUrl;
        const { subscriptions } = await api.patch<{
            subscriptions: NotificationSubscription[];
        }>(url, {
            payload,
        });
        return subscriptions;
    }

    return {
        list,
        update,
    };
}
