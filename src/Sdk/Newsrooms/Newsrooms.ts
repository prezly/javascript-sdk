import { Newsroom } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';

import {
    NewsroomCreateRequest,
    NewsroomListRequest,
    NewsroomListResponse,
    NewsroomSearchRequest,
    NewsroomUpdateRequest,
} from './types';

export default class Newsrooms {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    async list(
        { limit, offset, search, sortOrder }: NewsroomListRequest = {},
    ): Promise<NewsroomListResponse> {
        const response = await this.apiClient.get<NewsroomListResponse>(routing.newsroomsUrl, {
            query: {
                limit,
                offset,
                search,
                sort: sortOrder,
            },
        });

        return response.payload;
    }

    async search(
        { jsonQuery, limit, offset, search, sortOrder }: NewsroomSearchRequest = {},
    ): Promise<NewsroomListResponse> {
        const response = await this.apiClient.get<NewsroomListResponse>(routing.newsroomsUrl, {
            query: {
                query: jsonQuery,
                limit,
                offset,
                search,
                sort: sortOrder,
            },
        });

        return response.payload;
    }

    async get(id: Newsroom['id']): Promise<Newsroom> {
        const response = await this.apiClient.get<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}`,
        );
        return response.payload.newsroom;
    }

    async create(payload: NewsroomCreateRequest): Promise<Newsroom> {
        const response = await this.apiClient.post<{ newsroom: Newsroom }>(routing.newsroomsUrl, {
            payload,
        });
        return response.payload.newsroom;
    }

    async update(
        id: Newsroom['id'],
        payload: NewsroomUpdateRequest,
    ): Promise<Newsroom> {
        const response = await this.apiClient.patch<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}`,
            {
                payload,
            },
        );
        return response.payload.newsroom;
    }

    async archive(id: Newsroom['id']): Promise<Newsroom> {
        const response = await this.apiClient.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/archive`,
        );
        return response.payload.newsroom;
    }

    async unarchive(id: Newsroom['id']): Promise<Newsroom> {
        const response = await this.apiClient.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/unarchive`,
        );
        return response.payload.newsroom;
    }

    async remove(id: Newsroom['id']): Promise<void> {
        await this.apiClient.delete(`${routing.newsroomsUrl}/${id}`);
    }

    async takeOffline(id: Newsroom['id']): Promise<Newsroom> {
        const response = await this.apiClient.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/offline`,
        );
        return response.payload.newsroom;
    }

    async takeOnline(id: Newsroom['id']): Promise<Newsroom> {
        const response = await this.apiClient.post<{ newsroom: Newsroom }>(
            `${routing.newsroomsUrl}/${id}/online`,
        );
        return response.payload.newsroom;
    }
}
