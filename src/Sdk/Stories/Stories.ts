import { ExtendedStory, Story } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';

import {
    StoriesListRequest,
    StoriesListResponse,
    StoriesSearchRequest,
    StoryCreateRequest,
} from './types';

type StoryId = Story['uuid'] | Story['id'];

export default class Stories {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    async list({ limit, offset, sortOrder }: StoriesListRequest = {}): Promise<
        StoriesListResponse
    > {
        const response = await this.apiClient.get<StoriesListResponse>(routing.storiesUrl, {
            query: {
                limit,
                offset,
                sort: sortOrder,
            },
        });
        return response.payload;
    }

    async search({ jsonQuery, limit, offset, sortOrder }: StoriesSearchRequest = {}): Promise<
        StoriesListResponse
    > {
        const response = await this.apiClient.post<StoriesListResponse>(routing.storiesSearchUrl, {
            payload: {
                query: jsonQuery,
                limit,
                offset,
                sort: sortOrder,
            },
        });
        return response.payload;
    }

    async get(id: StoryId): Promise<ExtendedStory> {
        const response = await this.apiClient.get<{ story: ExtendedStory }>(
            `${routing.storiesUrl}/${id}`,
        );
        return response.payload.story;
    }

    async create(payload: StoryCreateRequest): Promise<ExtendedStory> {
        const response = await this.apiClient.post<{ story: ExtendedStory }>(routing.storiesUrl, {
            payload,
        });
        return response.payload.story;
    }
}
