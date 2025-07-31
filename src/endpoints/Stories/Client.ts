import type { ProgressPromise } from '@prezly/progress-promise';

import type { DeferredJobsApiClient } from '../../api';
import { ApiError, HttpCodes } from '../../http';
import { routing } from '../../routing';
import { SortOrder } from '../../types';
import type { ExtendedStory, Query, Story, StoriesBulkSelector } from '../../types';

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

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list<Options extends ListOptions>(
        options?: Exactly<Options, ListOptions>,
    ): Promise<ListResponse<Story & InferExtraFields<Options>>> {
        const { search, limit, offset, sortOrder, include, formats } = options ?? {};

        return api.get<ListResponse<Story & InferExtraFields<Options>>>(routing.storiesUrl, {
            headers: acceptedFormatsHeader(formats),
            query: {
                search,
                limit,
                offset,
                sort: SortOrder.stringify(sortOrder),
                include: include ? include.join(',') : undefined,
            },
        });
    }

    async function search<Options extends SearchOptions>(
        options?: Exactly<Options, SearchOptions>,
    ): Promise<ListResponse<Story & InferExtraFields<Options>>> {
        const { search, limit, offset, sortOrder, include, query, formats } = options ?? {};

        return api.post<ListResponse<Story & InferExtraFields<Options>>>(routing.storiesSearchUrl, {
            headers: acceptedFormatsHeader(formats),
            payload: {
                search,
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
    async function get<Options extends IncludeOptions & { formats?: Formats }>(
        id: Story['uuid'],
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>>;

    /**
     * Get multiple stories by UUIDs.
     */
    async function get<Options extends IncludeOptions & { formats?: Formats }>(
        ids: Story['uuid'][],
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<(ExtendedStory & InferExtraFields<Options>)[]>;

    /**
     * Get story by deprecated numeric ID, or UUID.
     * @deprecated Please use UUID instead.
     */
    async function get<Options extends IncludeOptions & { formats?: Formats }>(
        id: Story['id'] | Story['uuid'],
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>>;

    /**
     * Get multiple stories by numeric IDs.
     * @deprecated Please use UUID instead.
     */
    async function get<Options extends IncludeOptions & { formats?: Formats }>(
        ids: Story['id'][],
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<(ExtendedStory & InferExtraFields<Options>)[]>;

    /**
     * Implementation
     */
    async function get(
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
            const { stories } = await search({
                limit: arg.length,
                query: { id: { $in: arg } },
                include: [...EXTENDED_STORY_INCLUDED_EXTRA_FIELDS, ...(include ?? [])],
                formats,
            });
            return stories;
        }

        if (isArray && typeof arg[0] === 'string') {
            const { stories } = await search({
                limit: arg.length,
                query: { uuid: { $in: arg } },
                include: [...EXTENDED_STORY_INCLUDED_EXTRA_FIELDS, ...(include ?? [])],
                formats,
            });

            return stories;
        }

        const { story } = await api.get<{
            story: ExtendedStory & Partial<Story.ExtraFields>;
        }>(`${routing.storiesUrl}/${arg}`, {
            headers: acceptedFormatsHeader(formats),
            query: { include },
        });
        return story;
    }

    async function getBySlug<Options extends IncludeOptions & { formats?: Formats; query?: Query }>(
        slug: Story['slug'],
        options?: Exactly<Options, IncludeOptions & { formats?: Formats; query?: Query }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        if (slug.includes('/') || slug.includes('\\')) {
            throw new Error('Story slugs cannot contain slashes.');
        }

        const { include, query, formats } = options ?? {};

        const { story } = await api.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(`${routing.storiesUrl}/by-slug/${slug}`, {
            headers: acceptedFormatsHeader(formats),
            query: { include },
            payload: { query },
        });

        return story;
    }

    async function create<Options extends IncludeOptions & { formats?: Formats; force?: boolean }>(
        payload: CreateRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats; force?: boolean }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const { include, formats, force = false } = options ?? {};

        const { story } = await api.post<{
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

    async function duplicate<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const { include, formats } = options ?? {};

        const url = `${routing.storiesUrl}/${id}/duplicate`;

        const { story } = await api.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            query: { include },
        });

        return story;
    }

    async function translate<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload: TranslateRequest = {},
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const { culture, auto = false } = payload ?? {};
        const { include, formats } = options ?? {};

        const url = `${routing.storiesUrl}/${id}/translate`;

        const { story } = await api.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            query: { include },
            payload: {
                culture,
                auto,
            },
        });

        return story;
    }

    async function move<Options extends IncludeOptions & { formats?: Formats; force?: boolean }>(
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
            const { story } = await api.post<{
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

    async function update<Options extends IncludeOptions & { formats?: Formats; force?: boolean }>(
        id: StoryId,
        payload: UpdateRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats; force?: boolean }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}`;
        const { include, formats, force = false } = options ?? {};

        const { story } = await api.patch<{
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
    async function autosave<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload: AutosaveRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/autosave`;
        const { include, formats } = options ?? {};

        const { story } = await api.patch<{
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
    async function revert<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload?: RevertRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/revert`;
        const { include, formats } = options ?? {};

        const { story } = await api.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            payload,
            query: { include },
        });
        return story;
    }

    async function publish<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload?: PublishRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/publish`;
        const { include, formats } = options ?? {};

        const { story } = await api.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            payload,
            query: { include },
        });
        return story;
    }

    async function unpublish<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload?: UnpublishRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/unpublish`;
        const { include, formats } = options ?? {};

        const { story } = await api.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            payload,
            query: { include },
        });
        return story;
    }

    async function schedule<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload?: ScheduleRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/schedule`;
        const { include, formats } = options ?? {};

        const { story } = await api.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            payload,
            query: { include },
        });
        return story;
    }

    async function unschedule<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        payload?: UnscheduleRequest,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/unpublish`;
        const { include, formats } = options ?? {};

        const { story } = await api.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            payload,
            query: { include },
        });
        return story;
    }

    async function pin<Options extends IncludeOptions & { formats?: Formats; force?: boolean }>(
        id: StoryId,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats; force?: boolean }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/pin`;
        const { include, formats, force = false } = options ?? {};

        const { story } = await api.post<{
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

    async function unpin<Options extends IncludeOptions & { formats?: Formats }>(
        id: StoryId,
        options?: Exactly<Options, IncludeOptions & { formats?: Formats }>,
    ): Promise<ExtendedStory & InferExtraFields<Options>> {
        const url = `${routing.storiesUrl}/${id}/unpin`;
        const { include, formats } = options ?? {};

        const { story } = await api.post<{
            story: ExtendedStory & InferExtraFields<Options>;
        }>(url, {
            headers: acceptedFormatsHeader(formats),
            query: { include: include },
        });
        return story;
    }

    async function doDelete(id: StoryId): Promise<void> {
        const url = `${routing.storiesUrl}/${id}`;
        await api.delete(url);
    }

    function bulkDelete(
        options: Partial<{
            selection: StoriesBulkSelector;
            query: string;
        }>,
    ): ProgressPromise<{ records_deleted_number: number }> {
        const { selection, query } = options;
        return api.delete(routing.storiesUrl, {
            payload: { selection, query },
        });
    }

    async function preview(id: StoryId, options?: PreviewOptions): Promise<PreviewResponse> {
        const url = `${routing.storiesUrl}/${id}/preview`;

        const { preview } = await api.get<{ preview: PreviewResponse }>(url, {
            query: {
                alignment: options?.alignment,
                appearance: options?.appearance,
                header_footer: options?.headerFooter,
            },
        });
        return preview;
    }

    return {
        list,
        search,
        get,
        getBySlug,
        create,
        duplicate,
        translate,
        move,
        update,
        autosave,
        revert,
        publish,
        unpublish,
        schedule,
        unschedule,
        pin,
        unpin,
        delete: doDelete,
        bulkDelete,
        preview,
    };
}

function acceptedFormatsHeader(formats: Story.FormatVersion[] = []): Record<string, string> {
    if (formats.length === 0) {
        return {};
    }
    return {
        Accept: formats.map((format) => `application/json; content-format=v${format}`).join(', '),
    };
}
