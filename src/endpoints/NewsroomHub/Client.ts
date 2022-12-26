import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { NewsroomRef } from '../../types';

import type { ListResponse, LinkOptions, HubMember, LinkManyRequest } from './types';

type NewsroomId = NewsroomRef['uuid'] | NewsroomRef['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async list(newsroomId: NewsroomId): Promise<HubMember[]> {
        const url = generateUrl(newsroomId);
        const { members } = await this.apiClient.get<ListResponse>(url);
        return members;
    }

    public async linkMany(newsroomId: NewsroomId, payload: LinkManyRequest): Promise<HubMember[]> {
        const url = generateUrl(newsroomId);
        const { members } = await this.apiClient.post<ListResponse>(url, { payload });
        return members;
    }

    public async member(newsroomId: NewsroomId, memberId: NewsroomId): Promise<HubMember> {
        const url = generateUrl(newsroomId, memberId);
        const { member } = await this.apiClient.get<{ member: HubMember }>(url);
        return member;
    }

    public async link(
        newsroomId: NewsroomId,
        memberId: NewsroomId,
        options: LinkOptions = {},
    ): Promise<HubMember> {
        const { is_displaying_stories_in_hub } = options;
        const url = generateUrl(newsroomId, memberId);
        const { member } = await this.apiClient.post<{ member: HubMember }>(url, {
            payload: { is_displaying_stories_in_hub },
        });
        return member;
    }

    public async unlink(newsroomId: NewsroomId, memberId: NewsroomId): Promise<void> {
        await this.apiClient.delete(generateUrl(newsroomId, memberId));
    }
}

function generateUrl(newsroomId: NewsroomId, memberId?: NewsroomId) {
    const url = routing.newsroomHubUrl.replace(':newsroom_id', String(newsroomId));

    if (typeof memberId === 'undefined') {
        return url;
    }

    return `${url}/${String(memberId)}`;
}
