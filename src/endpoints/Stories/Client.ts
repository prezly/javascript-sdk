import type { DeferredJobsApiClient } from '../../api';
import { ApiError, HttpCodes } from '../../http';
import { routing } from '../../routing';
import type { ExtendedStory, Query, Story } from '../../types';
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
import { EXTENDED_STORY_INCLUDED_EXTRA_FIELDS } from './types';

/**
 * `uuid` is the preferred way of targeting a Story. Numeric `id` is considered deprecated.
 */
type StoryId = Story['uuid'] | Story['id'];

type Formats = Story.FormatVersion[];

/**
 * Utility type to forbid arbitrary ad-hoc extensions of generic parameters.
 * @see https://stackoverflow.com/a/69666350
 */
type Exactly<Concrete, Abstract> = Concrete &
    Record<Exclude<keyof Concrete, keyof Abstract>, never>;

type InferExtraFields<T> = T extends Required<IncludeOptions<infer I>>
    ? Pick<Story.ExtraFields, I>
    : unknown;

type MaybeArray<T> = T | T[];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list<Options extends ListOptions>(
        options?: Exactly<Options, ListOptions>,
    ): Promise<ListResponse<Story & InferExtraFields<Options>>> {
        const { search, limit, offset, sortOrder, include, formats } = options ?? {};

        return this.apiClient.get<ListResponse<Story & InferExtraFields<Options>>>(
            routing.storiesUrl,
            {
                headers: acceptedFormatsHeader(formats),
                query: {
                    search,
                    limit,
                    offset,
                    sort: SortOrder.stringify(sortOrder),
                    include: include ? include.join(',') : undefined,
                },
            },
        );
    }

    async search<Options extends SearchOptions>(
        options?: Exactly<Options, SearchOptions>,
    ): Promise<ListResponse<Story & InferExtraFields<Options>>> {
        const { search, limit, offset, sortOrder, include, query, formats } = options ?? {};

        return this.apiClient.post<ListResponse<Story & InferExtraFields<Options>>>(
            routing.storiesSearchUrl,
            {
                headers: acceptedFormatsHeader(formats),
                payload: {
                    search,
                    query,
                    limit,
                    offset,
                    sort: SortOrder.stringify(sortOrder),
                    include: include ? include.join(',') : undefined,
                },
            },
        );
    }

    /**
     * Get story by UUID.
     */
    async get<Options extends IncludeOptions & { formats?: Formats }>(
        id: Story['uuid'],
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>>;

    /**
     * Get multiple stories by UUIDs.
     */
    async get<Options extends IncludeOptions & { formats?: Formats }>(
        ids: Story['uuid'][],
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<(ExtendedStory & InferExtraFields<Options>)[]>;

    /**
     * Get story by deprecated numeric ID, or UUID.
     * @deprecated Please use UUID instead.
     */
    async get<Options extends IncludeOptions & { formats?: Formats }>(
        id: Story['id'] | Story['uuid'],
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>>;

    /**
     * Get multiple stories by numeric IDs.
     * @deprecated Please use UUID instead.
     */
    async get<Options extends IncludeOptions & { formats?: Formats }>(
        ids: Story['id'][],
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<(ExtendedStory & InferExtraFields<Options>)[]>;

    /**
     * Implementation
     */
    async get(
        arg: Story['id'] | Story['uuid'] | Story['id'][] | Story['uuid'][],
        options?: IncludeOptions & { formats?: Formats },
    ): Promise<MaybeArray<ExtendedStory & Partial<Story.ExtraFields>>> {
        const { include, formats } = options ?? {};

        const isArray = Array.isArray(arg);

        if (isArray && arg.length === 0) {
            // No need to call the API.
            return [];
        }

        if (isArray && typeof arg[0] === 'number') {
            const { stories } = await this.search({
                limit: arg.length,
                query: { id: { $in: arg } },
                include: [...EXTENDED_STORY_INCLUDED_EXTRA_FIELDS, ...(include ?? [])],
                formats,
            });
            return stories;
        }

        if (isArray && typeof arg[0] === 'string') {
            const { stories } = await this.search({
                limit: arg.length,
                query: { uuid: { $in: arg } },
                include: [...EXTENDED_STORY_INCLUDED_EXTRA_FIELDS, ...(include ?? [])],
                formats,
            });

            return stories;
        }

        const { story } = await this.apiClient.get<{
            story: ExtendedStory & Partial<Story.ExtraFields>;
        }>(`${routing.storiesUrl}/${arg}`, {
            headers: acceptedFormatsHeader(formats),
            query: { include },
        });
        return story;
    }

    async getBySlug<Options extends IncludeOptions & { formats?: Formats; query?: Query }>(
        slug: Story['slug'],
        options?: Exactly<Options, IncludeOptions & { formats?: Formats; query?: Query }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        if (slug.includes('/') || slug.includes('\\')) {
            throw new Error('Story slugs cannot contain slashes.');
        }

        const { include, query, formats } = options ?? {};

        const { story } = await this.apiClient.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(`${routing.storiesUrl}/by-slug/${slug}`, {
            headers: acceptedFormatsHeader(formats),
            query: { include },
            payload: { query },
        });

        return story;
    }

    async create<Options extends IncludeOptions & { formats?: Formats; force?: boolean }>(
        payload: CreateRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats; force?: boolean }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const { include, formats, force = false } = options ?? {};

        const { story } = await this.apiClient.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(routing.storiesUrl, {
            headers: acceptedFormatsHeader(formats),
            query: {
                include,
                force: force || undefined, // only pass it if it's true
            },
            payload,
        });
        return story;
    }

    async duplicate<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const { include, formats } = options ?? {};

        const url = `${routing.storiesUrl}/${id}/duplicate`;

        const { story } = await this.apiClient.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            query: { include },
        });

        return story;
    }

    async translate<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload: TranslateRequest = {},
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const { culture } = payload ?? {};
        const { include, formats } = options ?? {};

        const url = `${routing.storiesUrl}/${id}/translate`;

        const { story } = await this.apiClient.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            query: { include },
            payload: {
                culture,
            },
        });

        return story;
    }

    async move<Options extends IncludeOptions & { formats?: Formats; force?: boolean }>(
        id: StoryId,
        payload: MoveRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats; force?: boolean }>,
    ): Promise<
        | ChangeNewsroomSuccessResponse<ExtendedStory & InferExtraFields<Options>>
        | ChangeNewsroomUnsafeResponse
    > {
        const { include, formats, force = false } = options ?? {};

        const url = `${routing.storiesUrl}/${id}/move`;

        try {
            const { story } = await this.apiClient.post<{
                story: ExtendedStory & InferExtraFields<Options>;
            }>(url, {
                headers: acceptedFormatsHeader(formats),
                query: {
                    include,
                    force: force || undefined, // only pass it if it's true
                },
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

    async update<Options extends IncludeOptions & { formats?: Formats; force?: boolean }>(
        id: StoryId,
        payload: UpdateRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats; force?: boolean }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}`;
        const { include, formats, force = false } = options ?? {};

        const { story } = await this.apiClient.patch<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            query: {
                include,
                force: force || undefined, // only pass it if it's true
            },
            payload,
        });
        return story;
    }

    /**
     * This operation is only allowed for V3 stories
     */
    async autosave<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload: AutosaveRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/autosave`;
        const { include, formats } = options ?? {};

        const { story } = await this.apiClient.patch<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            payload,
            query: { include },
        });
        return story;
    }

    /**
     * This operation is only allowed for V3 stories
     */
    async revert<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload?: RevertRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/revert`;
        const { include, formats } = options ?? {};

        const { story } = await this.apiClient.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            payload,
            query: { include },
        });
        return story;
    }

    async publish<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload?: PublishRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/publish`;
        const { include, formats } = options ?? {};

        const { story } = await this.apiClient.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            payload,
            query: { include },
        });
        return story;
    }

    async unpublish<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload?: UnpublishRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/unpublish`;
        const { include, formats } = options ?? {};

        const { story } = await this.apiClient.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            payload,
            query: { include },
        });
        return story;
    }

    async schedule<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload?: ScheduleRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/schedule`;
        const { include, formats } = options ?? {};

        const { story } = await this.apiClient.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            payload,
            query: { include },
        });
        return story;
    }

    async unschedule<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload?: UnscheduleRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/unpublish`;
        const { include, formats } = options ?? {};

        const { story } = await this.apiClient.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            payload,
            query: { include },
        });
        return story;
    }

    async pin<Options extends IncludeOptions & { formats?: Formats; force?: boolean }>(
        id: StoryId,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats; force?: boolean }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/pin`;
        const { include, formats, force = false } = options ?? {};

        const { story } = await this.apiClient.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            query: {
                include: include,
                force: force || undefined, // only pass it if it's true
            },
        });
        return story;
    }

    async unpin<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/unpin`;
        const { include, formats } = options ?? {};

        const { story } = await this.apiClient.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            query: { include: include },
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

function acceptedFormatsHeader(formats: Story.FormatVersion[] = []): Record<string, string> {
    if (formats.length === 0) {
        return {};
    }
    return {
        Accept: formats.map((format) => `application/json; content-format=v${format}`).join(', '),
    };
}
