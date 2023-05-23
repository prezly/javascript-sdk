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

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    /**
     * List Contacts Exports with sorting, and pagination.
     */
    async list(options: ListOptions): Promise<ListResponse> {
        const { limit, offset, sortOrder } = options;
        const { contacts, pagination, sort } = await this.apiClient.get<{
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
    async search(options: SearchOptions): Promise<SearchResponse> {
        const { limit, offset, query, sortOrder } = options;
        const url = `${routing.contactsUrl}/search`;
        const { contacts, pagination, sort } = await this.apiClient.post<{
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

    async get(id: Contact['id']): Promise<Contact> {
        const url = `${routing.contactsUrl}/${id}`;
        const { contact } = await this.apiClient.get<{ contact: Contact }>(url);

        return contact;
    }

    async getMany(ids: Contact['id'][]): Promise<Contact[]> {
        const { contacts } = await this.search({
            query: { id: { $in: ids } },
            limit: ids.length,
        });
        // Reorder results to match the order of `ids`.
        return contacts.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
    }

    async create(payload: CreateRequest): Promise<Contact> {
        const { contact } = await this.apiClient.post<{ contact: Contact }>(routing.contactsUrl, {
            payload,
        });
        return contact;
    }

    async update(id: Contact['id'], payload: UpdateRequest): Promise<Contact> {
        const url = `${routing.contactsUrl}/${id}`;
        const { contact } = await this.apiClient.patch<{ contact: Contact }>(url, {
            payload,
        });
        return contact;
    }

    async tag(id: Contact['id'], tags: (TagId | TagName)[]): Promise<Contact> {
        const url = `${routing.contactsUrl}/${id}`;
        const { contact } = await this.apiClient.patch<{ contact: Contact }>(url, {
            payload: {
                '+tags': tags,
            },
        });
        return contact;
    }

    async untag(id: Contact['id'], tags: (TagId | TagName)[]): Promise<Contact> {
        const url = `${routing.contactsUrl}/${id}`;
        const { contact } = await this.apiClient.patch<{ contact: Contact }>(url, {
            payload: {
                '-tags': tags,
            },
        });
        return contact;
    }

    async bulkTag(selector: BulkSelector, tags: (TagId | TagName)[]): ProgressPromise<undefined> {
        const { scope, query } = selector;
        return this.apiClient.patch(routing.contactsUrl, {
            payload: { query, scope, '+tags': tags },
        });
    }

    async bulkUntag(selector: BulkSelector, tags: (TagId | TagName)[]): ProgressPromise<undefined> {
        const { query, scope } = selector;
        return this.apiClient.patch(routing.contactsUrl, {
            payload: { query, scope, '-tags': tags },
        });
    }

    async delete(id: Contact['id']) {
        const url = `${routing.contactsUrl}/${id}`;
        await this.apiClient.delete(url);
    }

    async bulkDelete(selector: BulkSelector) {
        const { query, scope } = selector;
        return this.apiClient.delete<BulkDeleteResponse>(routing.contactsUrl, {
            payload: { query, scope },
        });
    }
}
