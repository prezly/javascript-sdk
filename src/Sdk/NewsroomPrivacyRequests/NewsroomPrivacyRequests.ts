import { Newsroom, PrivacyRequest } from '../../types';

import DeferredJobsApiClient from '../DeferredJobsApiClient';
import routing from '../routing';
import { NewsroomPrivacyRequestCreateRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class NewsroomPrivacyRequests {
    private readonly apiClient: DeferredJobsApiClient;

    constructor({ apiClient }: { apiClient: DeferredJobsApiClient }) {
        this.apiClient = apiClient;
    }

    public async create(
        newsroomId: NewsroomId,
        payload: NewsroomPrivacyRequestCreateRequest,
    ): Promise<PrivacyRequest> {
        const url = routing.newsroomPrivacyRequestsUrl.replace(':newsroom_id', String(newsroomId));
        const { privacy_request } = await this.apiClient.post<{ privacy_request: PrivacyRequest }>(
            url,
            {
                payload,
            },
        );
        return privacy_request;
    }

    public async confirm(
        newsroomId: NewsroomId,
        privacyRequestId: PrivacyRequest['id'],
    ): Promise<PrivacyRequest> {
        const url = routing.newsroomPrivacyRequestsUrl.replace(':newsroom_id', String(newsroomId));
        const { privacy_request } = await this.apiClient.post<{ privacy_request: PrivacyRequest }>(
            `${url}/${privacyRequestId}/confirm`,
        );
        return privacy_request;
    }
}
