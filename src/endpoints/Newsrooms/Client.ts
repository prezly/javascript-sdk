import { Newsroom } from '../../types';

import { routing } from '../../routing';
import { DeferredJobsApiClient } from '../../api';

import { CreateRequest, ListRequest, ListResponse, SearchRequest, UpdateRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list({ limit, offset, search, sortOrder }: ListRequest = {}): Promise<ListResponse> {
        return this.apiClient.get<ListResponse>(routing.newsroomsUrl, {
            query: {
                limit,
                offset,
                search,
                sort: sortOrder,
            },
        });
    }

    async search({
        jsonQuery,
        limit,
        offset,
        search,
        sortOrder,
    }: SearchRequest = {}): Promise<ListResponse> {
        return this.apiClient.get<ListResponse>(routing.newsroomsUrl, {
            query: {
                query: jsonQuery,
                limit,
                offset,
                search,
                sort: sortOrder,
            },
        });
    }

    async get(id: NewsroomId): Promise<Newsroom> {
        const { newsroom } = await this.apiClient.get<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}`,
        );
        return newsroom;
    }

    async create(payload: CreateRequest): Promise<Newsroom> {
        const { newsroom } = await this.apiClient.post<{ newsroom: Newsroom }>(
            routing.newsroomsUrl,
            {
                payload,
            },
        );
        return newsroom;
    }

    async update(id: NewsroomId, payload: UpdateRequest): Promise<Newsroom> {
        const { newsroom } = await this.apiClient.patch<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}`,
            {
                payload,
            },
        );
        return newsroom;
    }

    async archive(id: NewsroomId): Promise<Newsroom> {
        const { newsroom } = await this.apiClient.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/archive`,
        );
        return newsroom;
    }

    async unarchive(id: NewsroomId): Promise<Newsroom> {
        const { newsroom } = await this.apiClient.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/unarchive`,
        );
        return newsroom;
    }

    async remove(id: NewsroomId): Promise<void> {
        return this.apiClient.delete(`${routing.newsroomsUrl}/${id}`);
    }

    async takeOffline(id: NewsroomId): Promise<Newsroom> {
        const { newsroom } = await this.apiClient.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/offline`,
        );
        return newsroom;
    }

    async takeOnline(id: NewsroomId): Promise<Newsroom> {
        const { newsroom } = await this.apiClient.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/online`,
        );
        return newsroom;
    }
}
