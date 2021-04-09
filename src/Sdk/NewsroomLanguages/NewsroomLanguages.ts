import { Culture, Newsroom, NewsroomLanguageSettings } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';

import {
    NewsroomLanguageSettingsUpdateRequest,
    NewsroomLanguagesListRequest,
    NewsroomLanguagesListResponse,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class NewsroomLanguages {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    async list(
        newsroomId: NewsroomId,
        { sortOrder }: NewsroomLanguagesListRequest = {},
    ): Promise<NewsroomLanguagesListResponse> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<NewsroomLanguagesListResponse>(url, {
            query: {
                sort: sortOrder,
            },
        });

        return response.payload;
    }

    async get(
        newsroomId: NewsroomId,
        localeCode: Culture['code'],
        { fallback }: { fallback?: true | false } = {},
    ): Promise<NewsroomLanguageSettings> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ language: NewsroomLanguageSettings }>(
            `${url}/${localeCode}`,
            {
                query: { fallback: fallback || undefined },
            },
        );
        return response.payload.language;
    }

    async update(
        newsroomId: NewsroomId,
        localeCode: Culture['code'],
        payload: NewsroomLanguageSettingsUpdateRequest,
    ): Promise<NewsroomLanguageSettings> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.patch<{ language: NewsroomLanguageSettings }>(
            `${url}/${localeCode}`,
            {
                payload,
            },
        );
        return response.payload.language;
    }
}
