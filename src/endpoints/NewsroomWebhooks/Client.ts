import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Newsroom, NewsroomWebhook } from '../../types';

import type { CreateRequest, UpdateRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(newsroomId: NewsroomId): Promise<NewsroomWebhook[]> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const { webhooks } = await api.get<{ webhooks: NewsroomWebhook[] }>(url);
        return webhooks;
    }

    async function create(
        newsroomId: NewsroomId,
        payload: CreateRequest,
    ): Promise<NewsroomWebhook> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const { webhook } = await api.post<{ webhook: NewsroomWebhook }>(url, {
            payload,
        });
        return webhook;
    }

    async function get(
        newsroomId: NewsroomId,
        webhookId: NewsroomWebhook['id'],
    ): Promise<NewsroomWebhook> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const { webhook } = await api.get<{ webhook: NewsroomWebhook }>(`${url}/${webhookId}`);
        return webhook;
    }

    async function update(
        newsroomId: NewsroomId,
        webhookId: NewsroomWebhook['id'],
        payload: UpdateRequest,
    ): Promise<NewsroomWebhook> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const { webhook } = await api.patch<{ webhook: NewsroomWebhook }>(`${url}/${webhookId}`, {
            payload,
        });
        return webhook;
    }

    async function doDelete(
        newsroomId: NewsroomId,
        webhookId: NewsroomWebhook['id'],
    ): Promise<void> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        return api.delete(`${url}/${webhookId}`);
    }

    return {
        list,
        create,
        get,
        update,
        delete: doDelete,
    };
}
