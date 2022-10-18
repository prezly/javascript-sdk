import { Newsroom, NewsroomTheme, NewsroomThemePreset } from '../../types';

import routing from '../routing';
import { DeferredJobsApiClient } from '../DeferredJobsApiClient';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];
type NewsroomThemeId = NewsroomTheme['id'];

export default class NewsroomThemes {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async apply(
        newsroomId: NewsroomId,
        themeId: NewsroomThemeId,
        settings: NewsroomThemePreset['settings'],
    ): Promise<NewsroomThemePreset> {
        const url = routing.newsroomThemesUrl.replace(':newsroom_id', String(newsroomId));
        const { theme } = await this.apiClient.post<{ theme: NewsroomThemePreset }>(
            `${url}/${themeId}`,
            { payload: settings },
        );
        return theme;
    }

    public async get(
        newsroomId: NewsroomId,
        themeId: NewsroomThemeId,
    ): Promise<NewsroomThemePreset> {
        const url = routing.newsroomThemesUrl.replace(':newsroom_id', String(newsroomId));
        const { theme } = await this.apiClient.get<{ theme: NewsroomThemePreset }>(
            `${url}/${themeId}`,
        );
        return theme;
    }

    public async getActive(newsroomId: NewsroomId): Promise<NewsroomThemePreset> {
        const url = routing.newsroomThemesUrl.replace(':newsroom_id', String(newsroomId));
        const { theme } = await this.apiClient.get<{ theme: NewsroomThemePreset }>(`${url}/active`);
        return theme;
    }

    public async list(newsroomId: NewsroomId): Promise<NewsroomThemePreset[]> {
        const url = routing.newsroomThemesUrl.replace(':newsroom_id', String(newsroomId));
        const { themes } = await this.apiClient.get<{ themes: NewsroomThemePreset[] }>(url);
        return themes;
    }
}
