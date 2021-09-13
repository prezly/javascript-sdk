import { NewsroomDomain, Newsroom, NewsroomDomainShareInstructions } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';
import { NewsroomDomainLinkRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class NewsroomDomains {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async get(newsroomId: NewsroomId, domain: string): Promise<NewsroomDomain> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ domain: NewsroomDomain }>(`${url}/${domain}`);

        return response.payload.domain;
    }

    public async list(newsroomId: NewsroomId): Promise<NewsroomDomain[]> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ domains: NewsroomDomain[] }>(url);

        return response.payload.domains;
    }

    public async link(
        newsroomId: NewsroomId,
        payload: NewsroomDomainLinkRequest,
    ): Promise<NewsroomDomain> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ domain: NewsroomDomain }>(url, {
            payload,
        });

        return response.payload.domain;
    }

    public async unlink(newsroomId: NewsroomId, domain: string): Promise<void> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        await this.apiClient.delete(`${url}/${domain}`);
    }

    public async check(newsroomId: NewsroomId, domain: string): Promise<NewsroomDomain> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ domain: NewsroomDomain }>(
            `${url}/${domain}/check`,
        );

        return response.payload.domain;
    }

    public async shareDnsInstructions(
        newsroomId: NewsroomId,
        domain: string,
    ): Promise<NewsroomDomainShareInstructions> {
        const url = routing.newsroomDomainsUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{
            sharable_dns_instructions: NewsroomDomainShareInstructions;
        }>(`${url}/${domain}/share`);

        return response.payload.sharable_dns_instructions;
    }
}
