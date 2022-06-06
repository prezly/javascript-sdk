import { ProgressPromise } from '@prezly/progress-promise';

import { Campaign } from '../../types';

import routing from '../routing';
import DeferredJobsApiClient from '../DeferredJobsApiClient';
import { toIso8601 } from '../utils';

import {
    CampaignCreateRequest,
    CampaignRecipientsOperationResponse,
    CampaignResponse,
    CampaignUpdateRequest,
    CampaignsListResponse,
    CampaignsSearchOptions,
} from './types';

export default class Campaigns {
    private readonly apiClient: DeferredJobsApiClient;

    constructor({ apiClient }: { apiClient: DeferredJobsApiClient }) {
        this.apiClient = apiClient;
    }

    async list(options: CampaignsSearchOptions): Promise<CampaignsListResponse> {
        const { jsonQuery, page, pageSize, sortOrder } = options;
        return this.apiClient.get<CampaignsListResponse>(routing.campaignsUrl, {
            query: {
                limit: pageSize,
                page,
                query: jsonQuery ? JSON.stringify(jsonQuery) : undefined,
                sort: sortOrder,
            },
        });
    }

    async search(options: CampaignsSearchOptions): Promise<CampaignsListResponse> {
        const { jsonQuery, page, pageSize, sortOrder } = options;
        return this.apiClient.post<CampaignsListResponse>(routing.campaignsUrl, {
            payload: {
                limit: pageSize,
                page,
                query: jsonQuery,
                sort: sortOrder,
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
        payload: CampaignCreateRequest,
    ): ProgressPromise<CampaignRecipientsOperationResponse, { recipients_number: number }> {
        return this.apiClient.post<CampaignRecipientsOperationResponse>(routing.campaignsUrl, {
            payload,
        });
    }

    async update(id: Campaign['id'], payload: CampaignUpdateRequest): Promise<CampaignResponse> {
        return this.apiClient.patch<CampaignResponse>(`${routing.campaignsUrl}/${id}`, { payload });
    }
}
