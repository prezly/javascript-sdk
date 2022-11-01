import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { ExtendedStory, Story } from '../../types';

import type {
    CreateRequest,
    ListOptions,
    ListResponse,
    SearchOptions,
    UpdateRequest,
} from './types';

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
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends ListOptions<Include>,
        StoryRecord extends Story = Options['include'] extends Include
            ? Story & Pick<Story.OnDemandFields, Options['include'][number]>
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
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends ListOptions<Include>,
        StoryRecord extends Story = Options['include'] extends Include
            ? Story & Pick<Story.OnDemandFields, Options['include'][number]>
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

    /**
     * @deprecated Please use UUID instead.
     */
    async get(id: Story['id']): Promise<ExtendedStory>;
    /**
     * @deprecated Please use UUID instead.
     */
    async get(ids: Story['id'][]): Promise<ExtendedStory[]>;
    async get(id: Story['uuid']): Promise<ExtendedStory>;
    async get(ids: Story['uuid'][]): Promise<ExtendedStory[]>;
    async get(
        arg: Story['id'] | Story['uuid'] | Story['id'][] | Story['uuid'][],
    ): Promise<ExtendedStory | ExtendedStory[]> {
        const isArray = Array.isArray(arg);

        if (isArray && arg.length === 0) {
            // No need to call the API.
            return [];
        }

        if (isArray && typeof arg[0] === 'number') {
            const { stories } = await this.search({
                limit: arg.length,
                query: { id: { $in: arg } },
            });
            return stories;
        }

        if (isArray && typeof arg[0] === 'string') {
            const { stories } = await this.search({
                limit: arg.length,
                query: { uuid: { $in: arg } },
            });

            return stories;
        }

        const { story } = await this.apiClient.get<{ story: ExtendedStory }>(
            `${routing.storiesUrl}/${arg}`,
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
