import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Snippet } from '../../types';

import type { CreateRequest, UpdateRequest } from './types';

type SnippetId = Snippet['uuid'] | Snippet['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(): Promise<Snippet[]> {
        const url = routing.snippetsUrl;
        const { snippets } = await api.get<{ snippets: Snippet[] }>(url);
        return snippets;
    }

    async function get(snippetId: SnippetId): Promise<Snippet> {
        const url = routing.snippetsUrl;
        const { snippet } = await api.get<{ snippet: Snippet }>(`${url}/${snippetId}`);
        return snippet;
    }

    async function create(payload: CreateRequest): Promise<Snippet> {
        const url = routing.snippetsUrl;
        const { snippet } = await api.post<{ snippet: Snippet }>(url, {
            payload,
        });
        return snippet;
    }

    async function update(snippetId: SnippetId, payload: UpdateRequest): Promise<Snippet> {
        const url = routing.snippetsUrl;
        const { snippet } = await api.patch<{ snippet: Snippet }>(`${url}/${snippetId}`, {
            payload,
        });
        return snippet;
    }

    async function doDelete(snippetId: SnippetId): Promise<void> {
        const url = routing.snippetsUrl;
        return api.delete(`${url}/${snippetId}`);
    }

    return {
        list,
        get,
        create,
        update,
        delete: doDelete,
    };
}
