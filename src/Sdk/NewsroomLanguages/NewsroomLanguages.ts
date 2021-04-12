import { Culture, Newsroom, NewsroomLanguageSettings } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';

import {
    NewsroomLanguageSettingsUpdateRequest,
    NewsroomLanguagesListRequest,
    NewsroomLanguagesListResponse,
    UnsafeNewsroomUpdateErrorResponse,
} from './types';
import { isUnsafeNewsroomUpdateErrorResponse } from './lib';

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

    async enable(
        newsroomId: NewsroomId,
        localeCode: Culture['code'],
        payload: NewsroomLanguageSettingsUpdateRequest = {},
    ): Promise<NewsroomLanguageSettings> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.put<{ language: NewsroomLanguageSettings }>(
            `${url}/${localeCode}`,
            {
                payload,
            },
        );
        return response.payload.language;
    }

    async disable(newsroomId: NewsroomId, localeCode: Culture['code']): Promise<void> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        await this.apiClient.delete<{ language: NewsroomLanguageSettings }>(`${url}/${localeCode}`);
    }

    async update(
        newsroomId: NewsroomId,
        localeCode: Culture['code'],
        payload: NewsroomLanguageSettingsUpdateRequest,
        options: { force?: boolean } = {},
    ): Promise<NewsroomLanguageSettings> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        const force = Boolean(options.force);
        const response = await this.apiClient.patch<{ language: NewsroomLanguageSettings }>(
            `${url}/${localeCode}`,
            {
                query: { force: force ? true : undefined },
                payload,
            },
        );
        return response.payload.language;
    }

    async makeDefault(
        newsroomId: NewsroomId,
        localeCode: Culture['code'],
    ): Promise<NewsroomLanguageSettings> {
        return await this.update(newsroomId, localeCode, { is_default: true });
    }

    /**
     * This operation should be used for single-language newsrooms
     * to switch default language to another code.
     *
     * This will also move all linked stories, if any, to the new language code,
     * but will require a confirmation.
     */
    async switchDefaultLanguage(
        newsroomId: NewsroomId,
        localeCode: Culture['code'],
        newLocaleCode: Culture['code'],
        forceUnsafeOperation: boolean = false,
    ): Promise<
        | { status: 'success'; language: NewsroomLanguageSettings }
        | UnsafeNewsroomUpdateErrorResponse
    > {
        try {
            const language = await this.update(
                newsroomId,
                localeCode,
                { code: newLocaleCode },
                { force: forceUnsafeOperation },
            );
            return { status: 'success', language };
        } catch (error) {
            if (isUnsafeNewsroomUpdateErrorResponse(error)) {
                return error;
            }

            throw error;
        }
    }
}
