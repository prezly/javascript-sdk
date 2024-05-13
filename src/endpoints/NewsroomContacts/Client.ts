import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Newsroom, NewsroomContact } from '../../types';
import { Query } from '../../types';

import type {
    ListOptions,
    SearchOptions,
    CreateRequest,
    UpdateRequest,
    ReorderRequest,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];
type NewsroomContactId = NewsroomContact['uuid'] | NewsroomContact['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(
        newsroomId: NewsroomId,
        { search }: ListOptions = {},
    ): Promise<NewsroomContact[]> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contacts } = await api.get<{ contacts: NewsroomContact[] }>(url, {
            query: { search },
        });
        return contacts;
    }

    async function get(
        newsroomId: NewsroomId,
        contactId: NewsroomContactId,
    ): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contact } = await api.get<{ contact: NewsroomContact }>(`${url}/${contactId}`);
        return contact;
    }

    async function search(
        newsroomId: NewsroomId,
        { search, query }: SearchOptions = {},
    ): Promise<NewsroomContact[]> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contacts } = await api.get<{ contacts: NewsroomContact[] }>(url, {
            query: {
                search,
                query: Query.stringify(query),
            },
        });
        return contacts;
    }

    async function order(newsroomId: NewsroomId, payload: ReorderRequest): Promise<void> {
        const url = routing.newsroomContactsOrderUrl.replace(':newsroom_id', String(newsroomId));
        return api.post(url, {
            payload,
        });
    }

    async function create(
        newsroomId: NewsroomId,
        payload: CreateRequest,
    ): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contact } = await api.post<{ contact: NewsroomContact }>(url, {
            payload,
        });
        return contact;
    }

    async function update(
        newsroomId: NewsroomId,
        contactId: NewsroomContactId,
        payload: UpdateRequest,
    ): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contact } = await api.patch<{ contact: NewsroomContact }>(`${url}/${contactId}`, {
            payload,
        });
        return contact;
    }

    async function doDelete(
        newsroomId: NewsroomId,
        contactId: NewsroomContactId,
        force = false,
    ): Promise<void> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const query = force ? { force: true } : {};

        return api.delete(`${url}/${contactId}`, { query });
    }

    return {
        list,
        get,
        search,
        order,
        create,
        update,
        delete: doDelete,
    };
}
