import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { ContactsExport } from '../../types';
import { SortOrder } from '../../types';

import type { ContactsBulkSelector, ListOptions, ListResponse, SearchOptions } from './types';

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    /**
     * List Contacts Exports with sorting, and pagination.
     */
    async function list(options: ListOptions): Promise<ListResponse> {
        const { limit, offset, sortOrder } = options;
        return api.get<ListResponse>(routing.contactsExportsUrl, {
            query: {
                limit,
                offset,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    /**
     * List Contacts Exports with sorting, pagination, and filtering.
     */
    async function search(options: SearchOptions): Promise<ListResponse> {
        const { query, limit, offset, sortOrder } = options;
        const url = `${routing.contactsExportsUrl}/search`;
        return api.post<ListResponse>(url, {
            payload: {
                limit,
                offset,
                query,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    /**
     * Fetch Contacts Export object by its uuid.
     */
    async function get(uuid: ContactsExport['uuid']): Promise<ContactsExport> {
        const url = `${routing.contactsExportsUrl}/${uuid}`;
        const response = await api.get<{ export: ContactsExport }>(url);
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
    async function create(selector: ContactsBulkSelector): Promise<ContactsExport> {
        const { query, scope } = selector;
        const response = await api.post<{ export: ContactsExport }>(routing.contactsExportsUrl, {
            payload: {
                contacts: { query, scope },
            },
        });
        return response.export;
    }

    /**
     * Fetch a download URL to retrieve the given Contacts Export file.
     * Only works for exports with status = "done"
     * Fails with Method Not Allowed (405) error for pending and failed exports.
     */
    async function download(uuid: ContactsExport['uuid']): Promise<{ downloadUrl: string }> {
        const url = `${routing.contactsExportsUrl}/${uuid}/download`;
        const response = await api.post<{ download_url: string }>(url);
        return { downloadUrl: response.download_url };
    }

    return {
        list,
        search,
        get,
        create,
        download,
    };
}
