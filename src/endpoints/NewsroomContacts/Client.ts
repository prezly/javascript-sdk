import { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import { Newsroom, NewsroomContact, Query } from '../../types';


import { ListOptions, SearchOptions, CreateRequest, UpdateRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];
type NewsroomContactId = NewsroomContact['uuid'] | NewsroomContact['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async list(
        newsroomId: NewsroomId,
        { search }: ListOptions = {},
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
        { search, query }: SearchOptions = {},
    ): Promise<NewsroomContact[]> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contacts } = await this.apiClient.get<{ contacts: NewsroomContact[] }>(url, {
            query: {
                search,
                query: Query.stringify(query),
            },
        });
        return contacts;
    }

    public async create(newsroomId: NewsroomId, payload: CreateRequest): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contact } = await this.apiClient.post<{ contact: NewsroomContact }>(url, {
            payload,
        });
        return contact;
    }

    public async update(
        newsroomId: NewsroomId,
        contactId: NewsroomContactId,
        payload: UpdateRequest,
    ): Promise<NewsroomContact> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const { contact } = await this.apiClient.patch<{ contact: NewsroomContact }>(
            `${url}/${contactId}`,
            { payload },
        );
        return contact;
    }

    public async remove(
        newsroomId: NewsroomId,
        contactId: NewsroomContactId,
        force = false,
    ): Promise<void> {
        const url = routing.newsroomContactsUrl.replace(':newsroom_id', String(newsroomId));
        const query = force ? { force: true } : {};

        return this.apiClient.delete(`${url}/${contactId}`, { query });
    }
}
