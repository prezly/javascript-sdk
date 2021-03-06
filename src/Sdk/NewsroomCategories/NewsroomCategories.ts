import { Category, Newsroom } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';

import {
    NewsroomCategoriesListOptions,
    NewsroomCategoryCreateRequest,
    NewsroomCategoryUpdateRequest,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class NewsroomCategories {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async list(
        newsroomId: NewsroomId,
        { sortOrder }: NewsroomCategoriesListOptions = {},
    ): Promise<Category[]> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ categories: Category[] }>(url, {
            query: {
                sort: sortOrder,
            },
        });
        return response.payload.categories;
    }

    public async get(newsroomId: NewsroomId, categoryId: Category['id']): Promise<Category> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ category: Category }>(`${url}/${categoryId}`);
        return response.payload.category;
    }

    public async create(
        newsroomId: NewsroomId,
        payload: NewsroomCategoryCreateRequest,
    ): Promise<Category> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ category: Category }>(url, {
            payload,
        });
        return response.payload.category;
    }

    public async update(
        newsroomId: NewsroomId,
        categoryId: Category['id'],
        payload: NewsroomCategoryUpdateRequest,
    ): Promise<Category> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.patch<{ category: Category }>(
            `${url}/${categoryId}`,
            {
                payload,
            },
        );
        return response.payload.category;
    }

    public async remove(newsroomId: NewsroomId, categoryId: Category['id']): Promise<void> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        await this.apiClient.delete<{ category: Category }>(`${url}/${categoryId}`);
    }
}
