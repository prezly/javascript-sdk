import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { CultureRef, Newsroom, NewsroomLanguageSettings } from '../../types';

import { isUnsafeNewsroomUpdateErrorResponse } from './lib';
import type {
    SettingsUpdateRequest,
    ListOptions,
    ListResponse,
    UnsafeUpdateErrorResponse,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list(newsroomId: NewsroomId, { sortOrder }: ListOptions = {}): Promise<ListResponse> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.get<ListResponse>(url, {
            query: {
                sort: sortOrder,
            },
        });
    }

    async get(
        newsroomId: NewsroomId,
        localeCode: CultureRef['code'],
        { fallback }: { fallback?: true | false } = {},
    ): Promise<NewsroomLanguageSettings> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        const { language } = await this.apiClient.get<{ language: NewsroomLanguageSettings }>(
            `${url}/${localeCode}`,
            {
                query: { fallback: fallback || undefined },
            },
        );
        return language;
    }

    async enable(
        newsroomId: NewsroomId,
        localeCode: CultureRef['code'],
        payload: SettingsUpdateRequest = {},
    ): Promise<NewsroomLanguageSettings> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        const { language } = await this.apiClient.put<{ language: NewsroomLanguageSettings }>(
            `${url}/${localeCode}`,
            {
                payload,
            },
        );
        return language;
    }

    async disable(
        newsroomId: NewsroomId,
        localeCode: CultureRef['code'],
        { replacement }: { replacement?: CultureRef['code'] },
    ): Promise<void> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.delete(`${url}/${localeCode}`, {
            payload: {
                replacement,
            },
        });
    }

    async update(
        newsroomId: NewsroomId,
        localeCode: CultureRef['code'],
        payload: SettingsUpdateRequest,
        options: { force?: boolean } = {},
    ): Promise<NewsroomLanguageSettings> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        const force = Boolean(options.force);
        const { language } = await this.apiClient.patch<{ language: NewsroomLanguageSettings }>(
            `${url}/${localeCode}`,
            {
                query: { force: force ? true : undefined },
                payload,
            },
        );
        return language;
    }

    async makeDefault(
        newsroomId: NewsroomId,
        localeCode: CultureRef['code'],
    ): Promise<NewsroomLanguageSettings> {
        return this.update(newsroomId, localeCode, { is_default: true });
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
        localeCode: CultureRef['code'],
        newLocaleCode: CultureRef['code'],
        forceUnsafeOperation = false,
    ): Promise<
        { status: 'success'; language: NewsroomLanguageSettings } | UnsafeUpdateErrorResponse
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
