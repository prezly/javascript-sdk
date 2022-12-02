import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { ContactsExport } from '../../types';

import type { ContactsBulkSelector, ListOptions, ListResponse, SearchOptions } from './types';

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
        return this.apiClient.get<ListResponse>(routing.contactsExportsUrl, {
            query: {
                limit,
                offset,
                sort: sortOrder,
            },
        });
    }

    /**
     * List Contacts Exports with sorting, pagination, and filtering.
     */
    async search(options: SearchOptions): Promise<ListResponse> {
        const { query, limit, offset, sortOrder } = options;
        const url = `${routing.contactsExportsUrl}/search`;
        return this.apiClient.post<ListResponse>(url, {
            payload: {
                limit,
                offset,
                query,
                sort: sortOrder,
            },
        });
    }

    /**
     * Fetch Contacts Export object by its uuid.
     */
    async get(uuid: ContactsExport['uuid']): Promise<ContactsExport> {
        const url = `${routing.contactsExportsUrl}/${uuid}`;
        const response = await this.apiClient.get<{ export: ContactsExport }>(url);
        return response.export;
    }

    /**
     * Request export of the given selection of Contacts.
     * If the selection size is small enough, it can be processed right away,
     * returning an export with `status: "done"`.
     *
     * Otherwise, returns an export with `status: "new"`,
     * and will notify the user over email when it's done.
     */
    async create(selector: ContactsBulkSelector): Promise<ContactsExport> {
        const { query, scope } = selector;
        const response = await this.apiClient.post<{ export: ContactsExport }>(
            routing.contactsExportsUrl,
            {
                payload: {
                    contacts: { query, scope },
                },
            },
        );
        return response.export;
    }

    /**
     * Fetch a download URL to retrieve the given Contacts Export file.
     * Only works for exports with status = "done"
     * Fails with Method Not Allowed (405) error for pending and failed exports.
     */
    async download(uuid: ContactsExport['uuid']): Promise<{ downloadUrl: string }> {
        const url = `${routing.contactsExportsUrl}/${uuid}/download`;
        const response = await this.apiClient.post<{ download_url: string }>(url);
        return { downloadUrl: response.download_url };
    }
}
