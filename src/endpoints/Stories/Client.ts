import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { ExtendedStory, Story } from '../../types';

import type {
    AutosaveRequest,
    CreateRequest,
    IncludeOptions,
    ListOptions,
    ListResponse,
    PublishRequest,
    RevertRequest,
    ScheduleRequest,
    SearchOptions,
    UnpublishRequest,
    UnscheduleRequest,
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
        Options extends SearchOptions<Include>,
        StoryRecord extends Story = Options['include'] extends Include
            ? Story & Pick<Story.OnDemandFields, Options['include'][number]>
            : Story,
    >(options?: Options): Promise<ListResponse<StoryRecord>> {
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
     * Get story by UUID.
     */
    async get<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(id: Story['uuid'], options?: Options): Promise<StoryRecord>;

    /**
     * Get multiple stories by UUIDs.
     */
    async get<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(ids: Story['uuid'][], options?: Options): Promise<StoryRecord[]>;

    /**
     * Get story by deprecated numeric ID, or UUID.
     * @deprecated Please use UUID instead.
     */
    async get<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(id: Story['id'] | Story['uuid'], options?: Options): Promise<StoryRecord>;

    /**
     * Get multiple stories by numeric IDs.
     * @deprecated Please use UUID instead.
     */
    async get<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(ids: Story['id'][], options?: Options): Promise<StoryRecord[]>;

    /**
     * Implementation
     */
    async get<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(
        arg: Story['id'] | Story['uuid'] | Story['id'][] | Story['uuid'][],
        options?: Options,
    ): Promise<StoryRecord | StoryRecord[]> {
        const include = options?.include;
        const isArray = Array.isArray(arg);

        if (isArray && arg.length === 0) {
            // No need to call the API.
            return [];
        }

        if (isArray && typeof arg[0] === 'number') {
            const { stories } = await this.search<Include, SearchOptions<Include>, StoryRecord>({
                limit: arg.length,
                query: { id: { $in: arg } },
                include,
            });
            return stories;
        }

        if (isArray && typeof arg[0] === 'string') {
            const { stories } = await this.search<Include, SearchOptions<Include>, StoryRecord>({
                limit: arg.length,
                query: { uuid: { $in: arg } },
                include,
            });

            return stories;
        }

        const { story } = await this.apiClient.get<{ story: StoryRecord }>(
            `${routing.storiesUrl}/${arg}`,
            { query: { include: include as undefined | string[] } },
        );
        return story;
    }

    async create<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(payload: CreateRequest, options?: Options): Promise<StoryRecord> {
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(routing.storiesUrl, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async update<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(id: StoryId, payload: UpdateRequest, options?: Options): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}`;
        const include = options?.include;

        const { story } = await this.apiClient.patch<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    /**
     * This operation is only allowed for V3 stories
     */
    async autosave<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(id: StoryId, payload: AutosaveRequest, options?: Options): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/autosave`;
        const include = options?.include;

        const { story } = await this.apiClient.patch<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    /**
     * This operation is only allowed for V3 stories
     */
    async revert<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(id: StoryId, payload?: RevertRequest, options?: Options): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/revert`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async publish<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(id: StoryId, payload?: PublishRequest, options?: Options): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/publish`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async unpublish<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(id: StoryId, payload?: UnpublishRequest, options?: Options): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/unpublish`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async schedule<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(id: StoryId, payload?: ScheduleRequest, options?: Options): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/schedule`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async unschedule<
        Include extends readonly (keyof Story.OnDemandFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.OnDemandFields, Options['include'][number]>
            : ExtendedStory,
    >(id: StoryId, payload?: UnscheduleRequest, options?: Options): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/unpublish`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async delete(id: StoryId): Promise<void> {
        const url = `${routing.storiesUrl}/${id}`;
        await this.apiClient.delete(url);
    }
}
