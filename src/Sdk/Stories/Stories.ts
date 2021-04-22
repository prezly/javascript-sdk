import { ExtendedStory, ExtraStoryFields, Story } from '../../types';

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

    async list<
        I extends keyof ExtraStoryFields = never,
        S extends Story = Story & Pick<ExtraStoryFields, I>,
    >(options?: StoriesListRequest<I>): Promise<StoriesListResponse<S>> {
        const { limit, offset, sortOrder, include } = options || {};
        const response = await this.apiClient.get<StoriesListResponse<S>>(routing.storiesUrl, {
            query: {
                limit,
                offset,
                sort: sortOrder,
                include: include ? include.join(',') : undefined,
            },
        });
        return response.payload;
    }

    async search<
        I extends keyof ExtraStoryFields = never,
        S extends Story = Story & Pick<ExtraStoryFields, I>,
    >(options?: StoriesSearchRequest<I>): Promise<StoriesListResponse<S>> {
        const { limit, offset, sortOrder, include, jsonQuery } = options || {};
        const response = await this.apiClient.post<StoriesListResponse<S>>(routing.storiesSearchUrl, {
            payload: {
                query: jsonQuery,
                limit,
                offset,
                sort: sortOrder,
                include: include ? include.join(',') : undefined,
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
