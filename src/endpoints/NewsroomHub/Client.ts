import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { NewsroomRef } from '../../types';

import type { ListResponse, UpdateRequest, UpdateResponse } from './types';

type NewsroomId = NewsroomRef['uuid'] | NewsroomRef['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async list(newsroomId: NewsroomId): Promise<NewsroomRef[]> {
        const url = routing.newsroomHubUrl.replace(':newsroom_id', String(newsroomId));
        const { members } = await this.apiClient.get<ListResponse>(url);
        return members;
    }

    public async update(newsroomId: NewsroomId, payload: UpdateRequest): Promise<NewsroomRef[]> {
        const url = routing.newsroomHubUrl.replace(':newsroom_id', String(newsroomId));
        const { members } = await this.apiClient.post<UpdateResponse>(url, { payload });
        return members;
    }
}
