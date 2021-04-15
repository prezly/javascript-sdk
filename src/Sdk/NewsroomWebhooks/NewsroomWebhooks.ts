import {Newsroom,NewsroomWebhook} from "../../types";

import ApiClient from "../ApiClient";
import routing from "../routing";

import {
    NewsroomWebhookCreateRequest,
    NewsroomWebhookUpdateRequest,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class NewsroomWebhooks {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async list(
        newsroomId: NewsroomId,
    ): Promise<NewsroomWebhook[]> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ webhooks: NewsroomWebhook[] }>(url);
        return response.payload.webhooks;
    }

    public async create(
        newsroomId: NewsroomId,
        payload: NewsroomWebhookCreateRequest,
    ): Promise<NewsroomWebhook> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ webhook: NewsroomWebhook }>(url, {
            payload,
        });
        return response.payload.webhook;
    }

    public async get(
        newsroomId: NewsroomId,
        webhookId: NewsroomWebhook['id'],
    ): Promise<NewsroomWebhook> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ webhook: NewsroomWebhook }>(`${url}/${webhookId}`);
        return response.payload.webhook;
    }

    public async update(
        newsroomId: NewsroomId,
        webhookId: NewsroomWebhook['id'],
        payload: NewsroomWebhookUpdateRequest,
    ): Promise<NewsroomWebhook> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.patch<{ webhook: NewsroomWebhook }>(`${url}/${webhookId}`, {
            payload,
        });
        return response.payload.webhook;
    }

    public async remove(
        newsroomId: NewsroomId,
        webhookId: NewsroomWebhook['id'],
    ): Promise<void> {
        const url = routing.newsroomWebhooksUrl.replace(':newsroom_id', String(newsroomId));
        await this.apiClient.delete(`${url}/${webhookId}`);
    }
}
