import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Newsroom, NewsroomTheme, NewsroomThemePreset } from '../../types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];
type NewsroomThemeId = NewsroomTheme['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function apply(
        newsroomId: NewsroomId,
        themeId: NewsroomThemeId,
        settings: NewsroomThemePreset['settings'],
    ): Promise<NewsroomThemePreset> {
        const url = routing.newsroomThemesUrl.replace(':newsroom_id', String(newsroomId));
        const { theme } = await api.post<{ theme: NewsroomThemePreset }>(`${url}/${themeId}`, {
            payload: settings,
        });
        return theme;
    }

    async function get(
        newsroomId: NewsroomId,
        themeId: NewsroomThemeId,
    ): Promise<NewsroomThemePreset> {
        const url = routing.newsroomThemesUrl.replace(':newsroom_id', String(newsroomId));
        const { theme } = await api.get<{ theme: NewsroomThemePreset }>(`${url}/${themeId}`);
        return theme;
    }

    async function getActive(newsroomId: NewsroomId): Promise<NewsroomThemePreset> {
        const url = routing.newsroomThemesUrl.replace(':newsroom_id', String(newsroomId));
        const { theme } = await api.get<{ theme: NewsroomThemePreset }>(`${url}/active`);
        return theme;
    }

    async function list(newsroomId: NewsroomId): Promise<NewsroomThemePreset[]> {
        const url = routing.newsroomThemesUrl.replace(':newsroom_id', String(newsroomId));
        const { themes } = await api.get<{ themes: NewsroomThemePreset[] }>(url);
        return themes;
    }

    async function update(
        newsroomId: NewsroomId,
        themeId: NewsroomThemeId,
        settings: NewsroomThemePreset['settings'],
    ): Promise<NewsroomThemePreset> {
        const url = routing.newsroomThemesUrl.replace(':newsroom_id', String(newsroomId));
        const { theme } = await api.patch<{ theme: NewsroomThemePreset }>(`${url}/${themeId}`, {
            payload: settings,
        });
        return theme;
    }

    return {
        apply,
        get,
        getActive,
        list,
        update,
    };
}
