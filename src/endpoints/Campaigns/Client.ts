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

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(options: SearchOptions): Promise<ListResponse> {
        const { search, query, limit, offset, sortOrder } = options;
        return api.get<ListResponse>(routing.campaignsUrl, {
            query: {
                limit,
                offset,
                search,
                query: Query.stringify(query),
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async function search(options: SearchOptions): Promise<ListResponse> {
        const { search, query, limit, offset, sortOrder } = options;
        return api.post<ListResponse>(routing.campaignsUrl, {
            payload: {
                limit,
                offset,
                search,
                query,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async function get(id: Campaign['id']): Promise<CampaignResponse> {
        return api.get<CampaignResponse>(`${routing.campaignsUrl}/${id}`);
    }

    async function duplicate(id: Campaign['id']): Promise<CampaignResponse> {
        return api.post<CampaignResponse>(`${routing.campaignsUrl}/${id}/duplicate`);
    }

    async function doDelete(id: Campaign['id']): Promise<void> {
        return api.delete(`${routing.campaignsUrl}/${id}`);
    }

    async function test(id: Campaign['id'], emails: string[]): Promise<void> {
        return api.post(`${routing.campaignsUrl}/${id}/test`, {
            payload: { emails },
        });
    }

    async function send(id: Campaign['id']): Promise<void> {
        return api.post(`${routing.campaignsUrl}/${id}/send`);
    }

    async function schedule(id: Campaign['id'], sendAt: Date): Promise<Campaign> {
        const { campaign } = await api.post<{ campaign: Campaign }>(
            `${routing.campaignsUrl}/${id}/schedule`,
            {
                payload: {
                    schedule_at: toIso8601(sendAt),
                },
            },
        );
        return campaign;
    }

    async function unschedule(id: Campaign['id']): Promise<Campaign> {
        const { campaign } = await api.post<{ campaign: Campaign }>(
            `${routing.campaignsUrl}/${id}/unschedule`,
        );
        return campaign;
    }

    function create(
        payload: CreateRequest,
    ): ProgressPromise<RecipientsOperationResponse, { recipients_number: number }> {
        return api.post<RecipientsOperationResponse>(routing.campaignsUrl, {
            payload,
        });
    }

    async function update(id: Campaign['id'], payload: UpdateRequest): Promise<CampaignResponse> {
        return api.patch<CampaignResponse>(`${routing.campaignsUrl}/${id}`, { payload });
    }

    return {
        list,
        search,
        get,
        duplicate,
        test,
        send,
        schedule,
        unschedule,
        create,
        update,
        delete: doDelete,
    };
}
