import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { ExtendedStory, Story } from '../../types';


import type { ListOptions, ListResponse, SearchOptions, CreateRequest, UpdateRequest } from './types';

/**
 * `uuid` is the preferred way of targeting a Story. Numeric `id` is considered deprecated.
 */
type StoryId = Story['uuid'] | Story['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends ListOptions<Include>,
        StoryRecord extends Story = Options['include'] extends Include
            ? Story & Pick<Story.ExtraFields, Options['include'][number]>
            : Story,
    >(options?: Options): Promise<ListResponse<StoryRecord>> {
        const { limit, offset, sortOrder, include } = options ?? {};
        return this.apiClient.get<ListResponse<StoryRecord>>(routing.storiesUrl, {
            query: {
                limit,
                offset,
                sort: sortOrder,
                include: include ? include.join(',') : undefined,
            },
        });
    }

    async search<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends ListOptions<Include>,
        StoryRecord extends Story = Options['include'] extends Include
            ? Story & Pick<Story.ExtraFields, Options['include'][number]>
            : Story,
    >(options: SearchOptions<Include>): Promise<ListResponse<StoryRecord>> {
        const { limit, offset, sortOrder, include, query } = options ?? {};
        return this.apiClient.post<ListResponse<StoryRecord>>(routing.storiesSearchUrl, {
            payload: {
                query,
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

    async create(payload: CreateRequest): Promise<ExtendedStory> {
        const { story } = await this.apiClient.post<{ story: ExtendedStory }>(routing.storiesUrl, {
            payload,
        });
        return story;
    }

    async update(id: StoryId, payload: UpdateRequest): Promise<ExtendedStory> {
        const url = `${routing.storiesUrl}/${id}`;
        const { story } = await this.apiClient.patch<{ story: ExtendedStory }>(url, {
            payload,
        });
        return story;
    }
}
