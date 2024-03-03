import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { NewsroomRef } from '../../types';

import type { ListResponse, LinkOptions, HubMember, LinkManyRequest } from './types';

type NewsroomId = NewsroomRef['uuid'] | NewsroomRef['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(newsroomId: NewsroomId): Promise<HubMember[]> {
        const url = generateUrl(newsroomId);
        const { members } = await api.get<ListResponse>(url);
        return members;
    }

    async function member(newsroomId: NewsroomId, memberId: NewsroomId): Promise<HubMember> {
        const url = generateUrl(newsroomId, memberId);
        const { member } = await api.get<{ member: HubMember }>(url);
        return member;
    }

    async function link(
        newsroomId: NewsroomId,
        memberId: NewsroomId,
        options: LinkOptions = {},
    ): Promise<HubMember> {
        const { is_displaying_stories_in_hub } = options;
        const url = generateUrl(newsroomId, memberId);
        const { member } = await api.post<{ member: HubMember }>(url, {
            payload: { is_displaying_stories_in_hub },
        });
        return member;
    }

    async function linkMany(
        newsroomId: NewsroomId,
        payload: LinkManyRequest,
    ): Promise<HubMember[]> {
        const url = generateUrl(newsroomId);
        const { members } = await api.post<ListResponse>(url, { payload });
        return members;
    }

    async function unlink(newsroomId: NewsroomId, memberId: NewsroomId): Promise<void> {
        await api.delete(generateUrl(newsroomId, memberId));
    }

    return {
        list,
        member,
        link,
        linkMany,
        unlink,
    };
}

function generateUrl(newsroomId: NewsroomId, memberId?: NewsroomId) {
    const url = routing.newsroomHubUrl.replace(':newsroom_id', String(newsroomId));

    if (typeof memberId === 'undefined') {
        return url;
    }

    return `${url}/${String(memberId)}`;
}
