import { Newsroom, NewsroomContact } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';

import {
    NewsroomContactsListRequestOptions,
    NewsroomContactsSearchRequestOptions,
    NewsroomContactCreateRequest,
    NewsroomContactUpdateRequest,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class NewsroomContacts {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async list(
        newsroomId: NewsroomId,
        { search }: NewsroomContactsListRequestOptions = {},
    ): Promise<NewsroomContact[]> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ contacts: NewsroomContact[] }>(url, {
            query: { search },
        });
        return response.payload.contacts;
    }

    public async search(
        newsroomId: NewsroomId,
        { search, query }: NewsroomContactsSearchRequestOptions = {},
    ): Promise<NewsroomContact[]> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ contacts: NewsroomContact[] }>(url, {
            query: { search, query },
        });
        return response.payload.contacts;
    }

    public async create(
        newsroomId: NewsroomId,
        payload: NewsroomContactCreateRequest,
    ): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ contact: NewsroomContact }>(url, {
            payload,
        });
        return response.payload.contact;
    }

    public async update(
        newsroomId: NewsroomId,
        payload: NewsroomContactUpdateRequest,
    ): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ contact: NewsroomContact }>(url, {
            payload,
        });
        return response.payload.contact;
    }

    public async remove(
        newsroomId: NewsroomId,
        contactId: NewsroomContact['uuid'] | NewsroomContact['id'],
    ): Promise<void> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        await this.apiClient.delete(`${url}/${contactId}`);
    }
}
