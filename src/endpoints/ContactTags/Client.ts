import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import { type Contact, type ContactTag, Query, SortOrder } from '../../types';

import type {
    CreateOptions,
    CreateRequest,
    CreateResponse,
    ListOptions,
    ListResponse,
    MergeRequest,
    MergeResponse,
    SearchOptions,
    SearchResponse,
    UpdateOptions,
    UpdateRequest,
    UpdateResponse,
} from './types';

export type Client = ReturnType<typeof createClient>;

// Not putting these into the `./types` module to keep it local.
type RawModificationResponse = {
    tag: ContactTag;
    deleted_tags_ids: ContactTag['id'][];
};
type RawDeleteResponse = {
    deleted_tags_ids: ContactTag['id'][];
};

export function createClient(api: DeferredJobsApiClient) {
    async function list(options: ListOptions = {}): Promise<ListResponse> {
        const { sortOrder } = options;
        const { tags } = await api.get<{
            tags: ContactTag[];
        }>(routing.contactTagsUrl, {
            query: {
                sort: SortOrder.stringify(sortOrder),
            },
        });

        return { tags };
    }

    async function search(options: SearchOptions = {}): Promise<SearchResponse> {
        const { query, sortOrder } = options;
        const { tags } = await api.get<{
            tags: ContactTag[];
        }>(routing.contactTagsUrl, {
            query: {
                sort: SortOrder.stringify(sortOrder),
                query: Query.stringify(query),
            },
        });

        return { tags };
    }

    async function get(id: ContactTag['id']): Promise<ContactTag> {
        const url = `${routing.contactTagsUrl}/${id}`;
        const { tag } = await api.get<{ tag: ContactTag }>(url);

        return tag;
    }

    async function create(
        payload: CreateRequest,
        { force = false }: CreateOptions = {},
    ): Promise<CreateResponse> {
        const data = await api.post<RawModificationResponse>(routing.contactTagsUrl, {
            payload,
            query: {
                force: force || undefined, // Convert `false` to `undefined`
            },
        });
        return {
            tag: data.tag,
            deleted: data.deleted_tags_ids,
        };
    }

    async function update(
        id: Contact['id'],
        payload: UpdateRequest,
        { force = false }: UpdateOptions = {},
    ): Promise<UpdateResponse> {
        const url = `${routing.contactTagsUrl}/${id}`;
        const data = await api.patch<RawModificationResponse>(url, {
            payload,
            query: {
                force: force || undefined, // Convert `false` to `undefined`
            },
        });
        return {
            tag: data.tag,
            deleted: data.deleted_tags_ids,
        };
    }

    async function merge({ name, tags }: MergeRequest): Promise<MergeResponse> {
        const url = `${routing.contactTagsUrl}/merge`;
        const data = await api.post<RawModificationResponse>(url, {
            payload: { name, tags },
        });
        return {
            tag: data.tag,
            deleted: data.deleted_tags_ids,
        };
    }

    async function doDelete(id: ContactTag['id']) {
        const url = `${routing.contactTagsUrl}/${id}`;
        const data = await api.delete<RawDeleteResponse>(url);
        return { deleted: data.deleted_tags_ids };
    }

    async function doDeleteMany(ids: ContactTag['id'][]) {
        const data = await api.delete<RawDeleteResponse>(routing.contactTagsUrl, {
            query: {
                id: ids,
            },
        });
        return { deleted: data.deleted_tags_ids };
    }

    async function doDeleteUnused() {
        const data = await api.delete<RawDeleteResponse>(routing.contactTagsUrl, {
            query: {
                filter: 'unused',
            },
        });

        return { deleted: data.deleted_tags_ids };
    }

    return {
        list,
        search,
        get,
        create,
        update,
        merge,
        delete: doDelete,
        deleteMany: doDeleteMany,
        deleteUnused: doDeleteUnused,
    };
}
