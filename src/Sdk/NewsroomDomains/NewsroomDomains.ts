import { NewsroomDomain, Newsroom, NewsroomDomainShareInstructions } from '../../types';

import routing from '../routing';
import { DeferredJobsApiClient } from '../DeferredJobsApiClient';
import { NewsroomDomainLinkRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class NewsroomDomains {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async get(newsroomId: NewsroomId, domain: string): Promise<NewsroomDomain> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ domain: NewsroomDomain }>(`${url}/${domain}`);

        return response.domain;
    }

    public async list(newsroomId: NewsroomId): Promise<NewsroomDomain[]> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const { domains } = await this.apiClient.get<{ domains: NewsroomDomain[] }>(url);

        return domains;
    }

    public async link(
        newsroomId: NewsroomId,
        payload: NewsroomDomainLinkRequest,
    ): Promise<NewsroomDomain> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const { domain } = await this.apiClient.post<{ domain: NewsroomDomain }>(url, {
            payload,
        });

        return domain;
    }

    public async unlink(newsroomId: NewsroomId, domain: string): Promise<void> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        return this.apiClient.delete(`${url}/${domain}`);
    }

    public async check(newsroomId: NewsroomId, domain: string): Promise<NewsroomDomain> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ domain: NewsroomDomain }>(
            `${url}/${domain}/check`,
        );

        return response.domain;
    }

    public async shareDnsInstructions(
        newsroomId: NewsroomId,
        domain: string,
    ): Promise<NewsroomDomainShareInstructions> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{
            sharable_dns_instructions: NewsroomDomainShareInstructions;
        }>(`${url}/${domain}/share`);

        return response.sharable_dns_instructions;
    }
}
