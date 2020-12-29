import { Category, Newsroom } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';

import {
    NewsroomCategoriesListOptions,
    NewsroomCategoryCreateRequest,
    NewsroomCategoryUpdateRequest,
} from './types';

export default class NewsroomCategories {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async list(
        newsroomId: Newsroom['id'],
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

    public async create(
        newsroomId: Newsroom['id'],
        payload: NewsroomCategoryCreateRequest,
    ): Promise<Category> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ category: Category }>(url, {
            payload,
        });
        return response.payload.category;
    }

    public async update(
        newsroomId: Newsroom['id'],
        payload: NewsroomCategoryUpdateRequest,
    ): Promise<Category> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ category: Category }>(url, {
            payload,
        });
        return response.payload.category;
    }

    public async remove(newsroomId: Newsroom['id'], categoryId: Category['id']): Promise<void> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        await this.apiClient.delete<{ category: Category }>(`${url}/${categoryId}`);
    }
}
