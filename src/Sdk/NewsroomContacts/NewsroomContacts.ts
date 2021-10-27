import { Newsroom, NewsroomContact } from '../../types';

import routing from '../routing';
import DeferredJobsApiClient from '../DeferredJobsApiClient';

import {
    NewsroomContactsListRequestOptions,
    NewsroomContactsSearchRequestOptions,
    NewsroomContactCreateRequest,
    NewsroomContactUpdateRequest,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];
type NewsroomContactId = NewsroomContact['uuid'] | NewsroomContact['id'];

export default class NewsroomContacts {
    private readonly apiClient: DeferredJobsApiClient;

    constructor({ apiClient }: { apiClient: DeferredJobsApiClient }) {
        this.apiClient = apiClient;
    }

    public async list(
        newsroomId: NewsroomId,
        { search }: NewsroomContactsListRequestOptions = {},
    ): Promise<NewsroomContact[]> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contacts } = await this.apiClient.get<{ contacts: NewsroomContact[] }>(url, {
            query: { search },
        });
        return contacts;
    }

    async get(newsroomId: NewsroomId, contactId: NewsroomContactId): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contact } = await this.apiClient.get<{ contact: NewsroomContact }>(
            `${url}/${contactId}`,
        );
        return contact;
    }

    public async search(
        newsroomId: NewsroomId,
        { search, query }: NewsroomContactsSearchRequestOptions = {},
    ): Promise<NewsroomContact[]> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contacts } = await this.apiClient.get<{ contacts: NewsroomContact[] }>(url, {
            query: { search, query },
        });
        return contacts;
    }

    public async create(
        newsroomId: NewsroomId,
        payload: NewsroomContactCreateRequest,
    ): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contact } = await this.apiClient.post<{ contact: NewsroomContact }>(url, {
            payload,
        });
        return contact;
    }

    public async update(
        newsroomId: NewsroomId,
        contactId: NewsroomContactId,
        payload: NewsroomContactUpdateRequest,
    ): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contact } = await this.apiClient.patch<{ contact: NewsroomContact }>(
            `${url}/${contactId}`,
            { payload },
        );
        return contact;
    }

    public async remove(newsroomId: NewsroomId, contactId: NewsroomContactId, force = false): Promise<void> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const payload = force ? { force: true } : {};

        return this.apiClient.delete(`${url}/${contactId}`, { payload });
    }
}
