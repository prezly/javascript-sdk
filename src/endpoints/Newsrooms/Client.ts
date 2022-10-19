import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Newsroom} from '../../types';
import { Query } from '../../types';


import type { CreateRequest, ListOptions, ListResponse, SearchOptions, UpdateRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list({ limit, offset, search, sortOrder }: ListOptions = {}): Promise<ListResponse> {
        return this.apiClient.get<ListResponse>(routing.newsroomsUrl, {
            query: {
                limit,
                offset,
                search,
                sort: sortOrder,
            },
        });
    }

    async search(options: SearchOptions = {}): Promise<ListResponse> {
        const { query, limit, offset, search, sortOrder } = options;
        // TODO: Introduce dedicated Search POST API
        return this.apiClient.get<ListResponse>(routing.newsroomsUrl, {
            query: {
                query: Query.stringify(query),
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
