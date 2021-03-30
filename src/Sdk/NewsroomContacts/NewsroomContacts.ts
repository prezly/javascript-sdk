import { Newsroom, NewsroomContact } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';

import {
    NewsroomContactsListRequestOptions,
    NewsroomContactsSearchRequestOptions,
    NewsroomContactCreateRequest,
    NewsroomContactUpdateRequest,
} from './types';

export default class NewsroomContacts {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async list(
        newsroomId: Newsroom['uuid'] | Newsroom['id'],
        { search }: NewsroomContactsListRequestOptions = {},
    ): Promise<NewsroomContact[]> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ contacts: NewsroomContact[] }>(url, {
            query: { search },
        });
        return response.payload.contacts;
    }

    public async search(
        newsroomId: Newsroom['uuid'] | Newsroom['id'],
        { search, query }: NewsroomContactsSearchRequestOptions = {},
    ): Promise<NewsroomContact[]> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ contacts: NewsroomContact[] }>(url, {
            query: { search, query },
        });
        return response.payload.contacts;
    }

    public async create(
        newsroomId: Newsroom['uuid'] | Newsroom['id'],
        payload: NewsroomContactCreateRequest,
    ): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ contact: NewsroomContact }>(url, {
            payload,
        });
        return response.payload.contact;
    }

    public async update(
        newsroomId: Newsroom['uuid'] | Newsroom['id'],
        payload: NewsroomContactUpdateRequest,
    ): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ contact: NewsroomContact }>(url, {
            payload,
        });
        return response.payload.contact;
    }

    public async remove(
        newsroomId: Newsroom['uuid'] | Newsroom['id'],
        contactId: NewsroomContact['uuid'] | NewsroomContact['id'],
    ): Promise<void> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        await this.apiClient.delete(`${url}/${contactId}`);
    }
}
