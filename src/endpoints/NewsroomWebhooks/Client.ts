
import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Newsroom, NewsroomWebhook } from '../../types';

import type { CreateRequest, UpdateRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async list(newsroomId: NewsroomId): Promise<NewsroomWebhook[]> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const { webhooks } = await this.apiClient.get<{ webhooks: NewsroomWebhook[] }>(url);
        return webhooks;
    }

    public async create(newsroomId: NewsroomId, payload: CreateRequest): Promise<NewsroomWebhook> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const { webhook } = await this.apiClient.post<{ webhook: NewsroomWebhook }>(url, {
            payload,
        });
        return webhook;
    }

    public async get(
        newsroomId: NewsroomId,
        webhookId: NewsroomWebhook['id'],
    ): Promise<NewsroomWebhook> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const { webhook } = await this.apiClient.get<{ webhook: NewsroomWebhook }>(
            `${url}/${webhookId}`,
        );
        return webhook;
    }

    public async update(
        newsroomId: NewsroomId,
        webhookId: NewsroomWebhook['id'],
        payload: UpdateRequest,
    ): Promise<NewsroomWebhook> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const { webhook } = await this.apiClient.patch<{ webhook: NewsroomWebhook }>(
            `${url}/${webhookId}`,
            {
                payload,
            },
        );
        return webhook;
    }

    public async remove(newsroomId: NewsroomId, webhookId: NewsroomWebhook['id']): Promise<void> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.delete(`${url}/${webhookId}`);
    }
}
