import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Category, Newsroom } from '../../types';
import { SortOrder } from '../../types';

import type { ListOptions, CreateRequest, UpdateRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(
        newsroomId: NewsroomId,
        { sortOrder }: ListOptions = {},
    ): Promise<Category[]> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const { categories } = await api.get<{ categories: Category[] }>(url, {
            query: {
                sort: SortOrder.stringify(sortOrder),
            },
        });
        return categories;
    }

    async function get(newsroomId: NewsroomId, categoryId: Category['id']): Promise<Category> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const { category } = await api.get<{ category: Category }>(`${url}/${categoryId}`);
        return category;
    }

    async function create(newsroomId: NewsroomId, payload: CreateRequest): Promise<Category> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const { category } = await api.post<{ category: Category }>(url, {
            payload,
        });
        return category;
    }

    async function update(
        newsroomId: NewsroomId,
        categoryId: Category['id'],
        payload: UpdateRequest,
    ): Promise<Category> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        const { category } = await api.patch<{ category: Category }>(`${url}/${categoryId}`, {
            payload,
        });
        return category;
    }

    async function doDelete(newsroomId: NewsroomId, categoryId: Category['id']): Promise<void> {
        const url = routing.newsroomCategoriesUrl.replace(':newsroom_id', String(newsroomId));
        return api.delete<void>(`${url}/${categoryId}`);
    }

    return {
        list,
        get,
        create,
        update,
        delete: doDelete,
    };
}
