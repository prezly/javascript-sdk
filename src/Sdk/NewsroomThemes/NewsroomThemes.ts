import { Newsroom, NewsroomTheme, NewsroomThemePreset } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];
type NewsroomThemeId = NewsroomTheme['id'];

export default class NewsroomThemes {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async list(newsroomId: NewsroomId): Promise<NewsroomThemePreset[]> {
        const url = routing.newsroomThemesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ themes: NewsroomThemePreset[] }>(url);
        return response.payload.themes;
    }

    public async getActive(newsroomId: NewsroomId): Promise<NewsroomThemePreset> {
        const url = routing.newsroomThemesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ theme: NewsroomThemePreset }>(`${url}/active`);
        return response.payload.theme;
    }
}
