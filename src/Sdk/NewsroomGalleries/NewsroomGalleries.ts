import { Newsroom } from '../../types';

import routing from '../routing';
import DeferredJobsApiClient from '../DeferredJobsApiClient';
import { NewsroomGallery } from '../../types';
import { NewsroomGalleriesListRequest, NewsroomGalleriesListResponse } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class NewsroomGalleries {
    private readonly apiClient: DeferredJobsApiClient;

    constructor({ apiClient }: { apiClient: DeferredJobsApiClient }) {
        this.apiClient = apiClient;
    }

    public async get(
        newsroomId: NewsroomId,
        id: NewsroomGallery['uuid'],
    ): Promise<NewsroomGallery> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ gallery: NewsroomGallery }>(`${url}/${id}`);

        return response.gallery;
    }

    public async list(
        newsroomId: NewsroomId,
        payload: NewsroomGalleriesListRequest = {},
    ): Promise<NewsroomGalleriesListResponse> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.get<NewsroomGalleriesListResponse>(url, {
            query: payload,
        });
    }
}
