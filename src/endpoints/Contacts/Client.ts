import type { ProgressPromise } from '@prezly/progress-promise';

import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Contact, Pagination } from '../../types';
import { SortOrder } from '../../types';

import type {
    BulkDeleteResponse,
    BulkSelector,
    CreateRequest,
    ListOptions,
    ListResponse,
    SearchOptions,
    SearchResponse,
    UpdateRequest,
} from './types';

type TagId = number;
type TagName = string;

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    /**
     * List Contacts Exports with sorting, and pagination.
     */
    async function list(options: ListOptions = {}): Promise<ListResponse> {
        const { limit, offset, sortOrder } = options;
        const { contacts, pagination, sort } = await api.get<{
            contacts: Contact[];
            pagination: Pagination;
            sort: string;
        }>(routing.contactsUrl, {
            query: {
                limit,
                offset,
                sort: SortOrder.stringify(sortOrder),
            },
        });

        return { contacts, pagination, sortOrder: SortOrder.parse(sort) };
    }

    /**
     * List Contacts Exports with sorting, pagination, and filtering.
     */
    async function search(options: SearchOptions = {}): Promise<SearchResponse> {
        const { limit, offset, query, sortOrder } = options;
        const url = `${routing.contactsUrl}/search`;
        const { contacts, pagination, sort } = await api.post<{
            contacts: Contact[];
            pagination: Pagination;
            sort: string;
        }>(url, {
            payload: {
                limit,
                offset,
                sort: SortOrder.stringify(sortOrder),
                query,
            },
        });

        return { contacts, pagination, sortOrder: SortOrder.parse(sort) };
    }

    async function get(id: Contact['id']): Promise<Contact> {
        const url = `${routing.contactsUrl}/${id}`;
        const { contact } = await api.get<{ contact: Contact }>(url);

        return contact;
    }

    async function getMany(ids: Contact['id'][]): Promise<Contact[]> {
        const { contacts } = await search({
            query: { id: { $in: ids } },
            limit: ids.length,
        });
        // Reorder results to match the order of `ids`.
        return contacts.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
    }

    async function create(payload: CreateRequest): Promise<Contact> {
        const { contact } = await api.post<{ contact: Contact }>(routing.contactsUrl, {
            payload,
        });
        return contact;
    }

    async function update(id: Contact['id'], payload: UpdateRequest): Promise<Contact> {
        const url = `${routing.contactsUrl}/${id}`;
        const { contact } = await api.patch<{ contact: Contact }>(url, {
            payload,
        });
        return contact;
    }

    async function tag(id: Contact['id'], tags: (TagId | TagName)[]): Promise<Contact> {
        const url = `${routing.contactsUrl}/${id}`;
        const { contact } = await api.patch<{ contact: Contact }>(url, {
            payload: {
                '+tags': tags,
            },
        });
        return contact;
    }

    async function untag(id: Contact['id'], tags: (TagId | TagName)[]): Promise<Contact> {
        const url = `${routing.contactsUrl}/${id}`;
        const { contact } = await api.patch<{ contact: Contact }>(url, {
            payload: {
                '-tags': tags,
            },
        });
        return contact;
    }

    async function bulkTag(
        selector: BulkSelector,
        tags: (TagId | TagName)[],
    ): ProgressPromise<undefined> {
        const { scope, query } = selector;
        return api.patch(routing.contactsUrl, {
            payload: { query, scope, '+tags': tags },
        });
    }

    async function bulkUntag(
        selector: BulkSelector,
        tags: (TagId | TagName)[],
    ): ProgressPromise<undefined> {
        const { query, scope } = selector;
        return api.patch(routing.contactsUrl, {
            payload: { query, scope, '-tags': tags },
        });
    }

    async function doDelete(id: Contact['id']) {
        const url = `${routing.contactsUrl}/${id}`;
        await api.delete(url);
    }

    async function bulkDelete(selector: BulkSelector) {
        const { query, scope } = selector;
        return api.delete<BulkDeleteResponse>(routing.contactsUrl, {
            payload: { query, scope },
        });
    }

    return {
        list,
        search,
        get,
        getMany,
        create,
        update,
        tag,
        untag,
        bulkTag,
        bulkUntag,
        delete: doDelete,
        bulkDelete,
    };
}
