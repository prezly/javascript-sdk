import type { ProgressPromise } from '@prezly/progress-promise';

import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Campaign } from '../../types';
import { Query, SortOrder } from '../../types';
import { toIso8601 } from '../../utils';

import type {
    CreateRequest,
    RecipientsOperationResponse,
    CampaignResponse,
    UpdateRequest,
    ListResponse,
    SearchOptions,
} from './types';

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list(options: SearchOptions): Promise<ListResponse> {
        const { query, limit, offset, sortOrder } = options;
        return this.apiClient.get<ListResponse>(routing.campaignsUrl, {
            query: {
                limit,
                offset,
                query: Query.stringify(query),
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async search(options: SearchOptions): Promise<ListResponse> {
        const { query, limit, offset, sortOrder } = options;
        return this.apiClient.post<ListResponse>(routing.campaignsUrl, {
            payload: {
                limit,
                offset,
                query,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async get(id: Campaign['id']): Promise<CampaignResponse> {
        return this.apiClient.get<CampaignResponse>(`${routing.campaignsUrl}/${id}`);
    }

    async duplicate(id: Campaign['id']): Promise<CampaignResponse> {
        return this.apiClient.post<CampaignResponse>(`${routing.campaignsUrl}/${id}/duplicate`);
    }

    async delete(id: Campaign['id']): Promise<void> {
        return this.apiClient.delete(`${routing.campaignsUrl}/${id}`);
    }

    async test(id: Campaign['id'], emails: string[]): Promise<void> {
        return this.apiClient.post(`${routing.campaignsUrl}/${id}/test`, {
            payload: { emails },
        });
    }

    async send(id: Campaign['id']): Promise<void> {
        return this.apiClient.post(`${routing.campaignsUrl}/${id}/send`);
    }

    async schedule(id: Campaign['id'], sendAt: Date): Promise<Campaign> {
        const { campaign } = await this.apiClient.post<{ campaign: Campaign }>(
            `${routing.campaignsUrl}/${id}/schedule`,
            {
                payload: {
                    schedule_at: toIso8601(sendAt),
                },
            },
        );
        return campaign;
    }

    async unschedule(id: Campaign['id']): Promise<Campaign> {
        const { campaign } = await this.apiClient.post<{ campaign: Campaign }>(
            `${routing.campaignsUrl}/${id}/unschedule`,
        );
        return campaign;
    }

    async create(
        payload: CreateRequest,
    ): ProgressPromise<RecipientsOperationResponse, { recipients_number: number }> {
        return this.apiClient.post<RecipientsOperationResponse>(routing.campaignsUrl, {
            payload,
        });
    }

    async update(id: Campaign['id'], payload: UpdateRequest): Promise<CampaignResponse> {
        return this.apiClient.patch<CampaignResponse>(`${routing.campaignsUrl}/${id}`, { payload });
    }
}
