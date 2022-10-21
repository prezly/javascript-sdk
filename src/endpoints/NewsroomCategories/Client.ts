import { Category, Newsroom } from '../../types';

import { routing } from '../../routing';
import { DeferredJobsApiClient } from '../../api';

import { ListOptions, CreateRequest, UpdateRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async list(
        newsroomId: NewsroomId,
        { sortOrder }: ListOptions = {},
    ): Promise<Category[]> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const { categories } = await this.apiClient.get<{ categories: Category[] }>(url, {
            query: {
                sort: sortOrder,
            },
        });
        return categories;
    }

    public async get(newsroomId: NewsroomId, categoryId: Category['id']): Promise<Category> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const { category } = await this.apiClient.get<{ category: Category }>(
            `${url}/${categoryId}`,
        );
        return category;
    }

    public async create(newsroomId: NewsroomId, payload: CreateRequest): Promise<Category> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const { category } = await this.apiClient.post<{ category: Category }>(url, {
            payload,
        });
        return category;
    }

    public async update(
        newsroomId: NewsroomId,
        categoryId: Category['id'],
        payload: UpdateRequest,
    ): Promise<Category> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const { category } = await this.apiClient.patch<{ category: Category }>(
            `${url}/${categoryId}`,
            {
                payload,
            },
        );
        return category;
    }

    public async remove(newsroomId: NewsroomId, categoryId: Category['id']): Promise<void> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.delete<void>(`${url}/${categoryId}`);
    }
}
