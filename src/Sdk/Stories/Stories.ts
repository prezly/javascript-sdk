import { ExtendedStory, ExtraStoryFields, Story } from '../../types';

import routing from '../routing';
import DeferredJobsApiClient from '../DeferredJobsApiClient';

import {
    StoriesListRequest,
    StoriesListResponse,
    StoriesSearchRequest,
    StoryCreateRequest,
    StoryUpdateRequest,
} from './types';

/**
 * `uuid` is the preferred way of targeting a Story. Numeric `id` is considered deprecated.
 */
type StoryId = Story['uuid'] | Story['id'];

export default class Stories {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list<
        Include extends readonly (keyof ExtraStoryFields)[],
        Options extends StoriesListRequest<Include>,
        StoryRecord extends Story = Options['include'] extends Include
            ? Story & Pick<ExtraStoryFields, Options['include'][number]>
            : Story,
    >(options?: Options): Promise<StoriesListResponse<StoryRecord>> {
        const { limit, offset, sortOrder, include } = options || {};
        return this.apiClient.get<StoriesListResponse<StoryRecord>>(routing.storiesUrl, {
            query: {
                limit,
                offset,
                sort: sortOrder,
                include: include ? include.join(',') : undefined,
            },
        });
    }

    async search<
        Include extends readonly (keyof ExtraStoryFields)[],
        Options extends StoriesListRequest<Include>,
        StoryRecord extends Story = Options['include'] extends Include
            ? Story & Pick<ExtraStoryFields, Options['include'][number]>
            : Story,
    >(options?: StoriesSearchRequest<Include>): Promise<StoriesListResponse<StoryRecord>> {
        const { limit, offset, sortOrder, include, jsonQuery } = options || {};
        return this.apiClient.post<StoriesListResponse<StoryRecord>>(routing.storiesSearchUrl, {
            payload: {
                query: jsonQuery,
                limit,
                offset,
                sort: sortOrder,
                include: include ? include.join(',') : undefined,
            },
        });
    }

    async get(id: StoryId): Promise<ExtendedStory> {
        const { story } = await this.apiClient.get<{ story: ExtendedStory }>(
            `${routing.storiesUrl}/${id}`,
        );
        return story;
    }

    async create(payload: StoryCreateRequest): Promise<ExtendedStory> {
        const { story } = await this.apiClient.post<{ story: ExtendedStory }>(routing.storiesUrl, {
            payload,
        });
        return story;
    }

    async update(id: StoryId, payload: StoryUpdateRequest): Promise<ExtendedStory> {
        let url = `${routing.storiesUrl}/${id}`;
        const { story } = await this.apiClient.patch<{ story: ExtendedStory }>(url, {
            payload,
        });
        return story;
    }
}
