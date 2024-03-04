import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { NewsroomDomain, Newsroom } from '../../types';

import type { LinkRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function get(newsroomId: NewsroomId, domain: string): Promise<NewsroomDomain> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await api.get<{ domain: NewsroomDomain }>(`${url}/${domain}`);

        return response.domain;
    }

    async function list(newsroomId: NewsroomId): Promise<NewsroomDomain[]> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const { domains } = await api.get<{ domains: NewsroomDomain[] }>(url);

        return domains;
    }

    async function link(newsroomId: NewsroomId, payload: LinkRequest): Promise<NewsroomDomain> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const { domain } = await api.post<{ domain: NewsroomDomain }>(url, {
            payload,
        });

        return domain;
    }

    async function unlink(newsroomId: NewsroomId, domain: string): Promise<void> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        return api.delete(`${url}/${domain}`);
    }

    async function check(newsroomId: NewsroomId, domain: string): Promise<NewsroomDomain> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await api.post<{ domain: NewsroomDomain }>(`${url}/${domain}/check`);

        return response.domain;
    }

    async function shareDnsInstructions(
        newsroomId: NewsroomId,
        domain: string,
    ): Promise<NewsroomDomain.ShareInstructions> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await api.post<{
            sharable_dns_instructions: NewsroomDomain.ShareInstructions;
        }>(`${url}/${domain}/share`);

        return response.sharable_dns_instructions;
    }

    return {
        get,
        list,
        link,
        unlink,
        check,
        shareDnsInstructions,
    };
}
