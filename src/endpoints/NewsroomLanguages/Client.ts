import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { CultureRef, Newsroom, NewsroomLanguageSettings } from '../../types';
import { SortOrder } from '../../types';

import { isUnsafeNewsroomUpdateErrorResponse } from './lib';
import type {
    SettingsUpdateRequest,
    ListOptions,
    ListResponse,
    UnsafeUpdateErrorResponse,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(
        newsroomId: NewsroomId,
        { sortOrder }: ListOptions = {},
    ): Promise<ListResponse> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        return api.get<ListResponse>(url, {
            query: {
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async function get(
        newsroomId: NewsroomId,
        localeCode: CultureRef['code'],
        { fallback }: { fallback?: true | false } = {},
    ): Promise<NewsroomLanguageSettings> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        const { language } = await api.get<{ language: NewsroomLanguageSettings }>(
            `${url}/${localeCode}`,
            {
                query: { fallback: fallback || undefined },
            },
        );
        return language;
    }

    async function enable(
        newsroomId: NewsroomId,
        localeCode: CultureRef['code'],
        payload: SettingsUpdateRequest = {},
    ): Promise<NewsroomLanguageSettings> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        const { language } = await api.put<{ language: NewsroomLanguageSettings }>(
            `${url}/${localeCode}`,
            {
                payload,
            },
        );
        return language;
    }

    async function disable(
        newsroomId: NewsroomId,
        localeCode: CultureRef['code'],
        { replacement }: { replacement?: CultureRef['code'] },
    ): Promise<void> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        return api.delete(`${url}/${localeCode}`, {
            payload: {
                replacement,
            },
        });
    }

    async function update(
        newsroomId: NewsroomId,
        localeCode: CultureRef['code'],
        payload: SettingsUpdateRequest,
        options: { force?: boolean } = {},
    ): Promise<NewsroomLanguageSettings> {
        const url = routing.newsroomLanguagesUrl.replace(':newsroom_id', String(newsroomId));
        const force = Boolean(options.force);
        const { language } = await api.patch<{ language: NewsroomLanguageSettings }>(
            `${url}/${localeCode}`,
            {
                query: { force: force ? true : undefined },
                payload,
            },
        );
        return language;
    }

    async function makeDefault(
        newsroomId: NewsroomId,
        localeCode: CultureRef['code'],
    ): Promise<NewsroomLanguageSettings> {
        return update(newsroomId, localeCode, { is_default: true });
    }

    /**
     * This operation should be used for single-language newsrooms
     * to switch default language to another code.
     *
     * This will also move all linked stories, if any, to the new language code,
     * but will require a confirmation.
     */
    async function switchDefaultLanguage(
        newsroomId: NewsroomId,
        localeCode: CultureRef['code'],
        newLocaleCode: CultureRef['code'],
        forceUnsafeOperation = false,
    ): Promise<
        { status: 'success'; language: NewsroomLanguageSettings } | UnsafeUpdateErrorResponse
    > {
        try {
            const language = await update(
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

    return {
        list,
        get,
        enable,
        disable,
        update,
        makeDefault,
        switchDefaultLanguage,
    };
}
