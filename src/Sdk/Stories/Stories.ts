import { ExtendedStory, Story } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';

import { StoriesListResponse, StoryCreateRequest } from './types';

export default class Stories {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    async list(
        options: {
            limit?: number;
            offset?: number;
            sortOrder?: string;
        },
    ): Promise<StoriesListResponse> {
        const { limit, offset, sortOrder } = options;
        const response = await this.apiClient.get<StoriesListResponse>(routing.storiesApiUrl, {
            query: {
                limit,
                offset,
                sort: sortOrder,
            },
        });
        return response.payload;
    }

    async search(
        options: {
            jsonQuery?: string;
            limit?: number;
            offset?: number;
            sortOrder?: string;
        },
    ): Promise<StoriesListResponse> {
        const { jsonQuery, limit, offset, sortOrder } = options;
        const response = await this.apiClient.post<StoriesListResponse>(routing.storiesSearchApiUrl, {
            payload: {
                query: jsonQuery,
                limit,
                offset,
                sort: sortOrder,
            },
        });
        return response.payload;
    }

    async get(storyId: Story['id']): Promise<ExtendedStory> {
        const response = await this.apiClient.get<{ story: ExtendedStory }>(
            `${routing.storiesApiUrl}/${storyId}`,
        );
        return response.payload.story;
    }

    async create(payload: StoryCreateRequest): Promise<ExtendedStory> {
        const response = await this.apiClient.post<{ story: ExtendedStory }>(
            routing.storiesApiUrl,
            {
                payload,
            },
        );
        return response.payload.story;
    }
}
