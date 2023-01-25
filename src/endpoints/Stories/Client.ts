import type { DeferredJobsApiClient } from '../../api';
import { ApiError, HttpCodes } from '../../http';
import { routing } from '../../routing';
import type { ExtendedStory, Story } from '../../types';
import { SortOrder } from '../../types';

import type {
    AutosaveRequest,
    ChangeNewsroomSuccessResponse,
    ChangeNewsroomUnsafeResponse,
    CreateRequest,
    IncludeOptions,
    ListOptions,
    ListResponse,
    MoveRequest,
    PreviewResponse,
    PreviewOptions,
    PublishRequest,
    RevertRequest,
    ScheduleRequest,
    SearchOptions,
    TranslateRequest,
    UnpublishRequest,
    UnscheduleRequest,
    UpdateRequest,
} from './types';

/**
 * `uuid` is the preferred way of targeting a Story. Numeric `id` is considered deprecated.
 */
type StoryId = Story['uuid'] | Story['id'];

/**
 * Utility type to forbid arbitrary ad-hoc extensions of generic parameters.
 * @see https://stackoverflow.com/a/69666350
 */
type Exactly<T, X> = T & Record<Exclude<keyof X, keyof T>, never>;

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
    >(options?: Exactly<ListOptions<Include>, Options>): Promise<ListResponse<StoryRecord>> {
        const { limit, offset, sortOrder, include } = options ?? {};
        return this.apiClient.get<ListResponse<StoryRecord>>(routing.storiesUrl, {
            query: {
                limit,
                offset,
                sort: SortOrder.stringify(sortOrder),
                include: include ? include.join(',') : undefined,
            },
        });
    }

    async search<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends SearchOptions<Include>,
        StoryRecord extends Story = Options['include'] extends Include
            ? Story & Pick<Story.ExtraFields, Options['include'][number]>
            : Story,
    >(options?: Exactly<SearchOptions<Include>, Options>): Promise<ListResponse<StoryRecord>> {
        const { limit, offset, sortOrder, include, query } = options ?? {};
        return this.apiClient.post<ListResponse<StoryRecord>>(routing.storiesSearchUrl, {
            payload: {
                query,
                limit,
                offset,
                sort: SortOrder.stringify(sortOrder),
                include: include ? include.join(',') : undefined,
            },
        });
    }

    /**
     * Get story by UUID.
     */
    async get<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(id: Story['uuid'], options?: Exactly<IncludeOptions<Include>, Options>): Promise<StoryRecord>;

    /**
     * Get multiple stories by UUIDs.
     */
    async get<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        ids: Story['uuid'][],
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord[]>;

    /**
     * Get story by deprecated numeric ID, or UUID.
     * @deprecated Please use UUID instead.
     */
    async get<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        id: Story['id'] | Story['uuid'],
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord>;

    /**
     * Get multiple stories by numeric IDs.
     * @deprecated Please use UUID instead.
     */
    async get<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        ids: Story['id'][],
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord[]>;

    /**
     * Implementation
     */
    async get<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        arg: Story['id'] | Story['uuid'] | Story['id'][] | Story['uuid'][],
        options?: Exactly<IncludeOptions<Include>, Options>,
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
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        payload: CreateRequest,
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord> {
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(routing.storiesUrl, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async duplicate<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(id: StoryId, options?: Exactly<IncludeOptions<Include>, Options>): Promise<StoryRecord> {
        const include = options?.include;
        const url = `${routing.storiesUrl}/${id}/duplicate`;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            query: { include: include as string[] | undefined },
        });

        return story;
    }

    async translate<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        id: StoryId,
        payload: TranslateRequest,
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord> {
        const include = options?.include;
        const url = `${routing.storiesUrl}/${id}/translate`;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            query: { include: include as string[] | undefined },
            payload,
        });

        return story;
    }

    async move<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        id: StoryId,
        payload: MoveRequest,
        options?: Exactly<IncludeOptions<Include>, Options> & { force?: true },
    ): Promise<ChangeNewsroomSuccessResponse<StoryRecord> | ChangeNewsroomUnsafeResponse> {
        const include = options?.include;
        const force = options?.force;
        const url = `${routing.storiesUrl}/${id}/move`;

        try {
            const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
                query: { include: include as string[] | undefined, force },
                payload,
            });

            return { status: 'success', story };
        } catch (error) {
            if (error instanceof ApiError && error.status === HttpCodes.CONFLICT) {
                return error.payload as ChangeNewsroomUnsafeResponse;
            }
            throw error;
        }
    }

    async update<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        id: StoryId,
        payload: UpdateRequest,
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord> {
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
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        id: StoryId,
        payload: AutosaveRequest,
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord> {
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
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        id: StoryId,
        payload?: RevertRequest,
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/revert`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async publish<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        id: StoryId,
        payload?: PublishRequest,
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/publish`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async unpublish<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        id: StoryId,
        payload?: UnpublishRequest,
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/unpublish`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async schedule<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        id: StoryId,
        payload?: ScheduleRequest,
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/schedule`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async unschedule<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        id: StoryId,
        payload?: UnscheduleRequest,
        options?: Exactly<IncludeOptions<Include>, Options>,
    ): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/unpublish`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            payload,
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async pin<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(
        id: StoryId,
        options?: Exactly<IncludeOptions<Include>, Options> & { force?: boolean },
    ): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/pin`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            query: {
                include: include as string[] | undefined,
                force: options?.force || undefined,
            },
        });
        return story;
    }

    async unpin<
        Include extends readonly (keyof Story.ExtraFields)[],
        Options extends IncludeOptions<Include>,
        StoryRecord extends ExtendedStory = Options['include'] extends Include
            ? ExtendedStory & Pick<Story.ExtraFields, Options['include'][number]>
            : ExtendedStory,
    >(id: StoryId, options?: Exactly<IncludeOptions<Include>, Options>): Promise<StoryRecord> {
        const url = `${routing.storiesUrl}/${id}/unpin`;
        const include = options?.include;

        const { story } = await this.apiClient.post<{ story: StoryRecord }>(url, {
            query: { include: include as string[] | undefined },
        });
        return story;
    }

    async delete(id: StoryId): Promise<void> {
        const url = `${routing.storiesUrl}/${id}`;
        await this.apiClient.delete(url);
    }

    async preview(id: StoryId, options?: PreviewOptions): Promise<PreviewResponse> {
        const url = `${routing.storiesUrl}/${id}/preview`;

        const { preview } = await this.apiClient.get<{ preview: PreviewResponse }>(url, {
            query: {
                alignment: options?.alignment,
                appearance: options?.appearance,
            },
        });
        return preview;
    }
}
