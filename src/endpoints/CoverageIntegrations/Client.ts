import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import { type CoverageIntegration, SortOrder } from '../../types';

import type { CreateRequest, ListRunsOptions, ListRunsResponse, UpdateRequest } from './types';

type IntegrationId = CoverageIntegration['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(): Promise<CoverageIntegration[]> {
        const url = routing.coverageIntegrationsUrl;
        const { integrations } = await api.get<{ integrations: CoverageIntegration[] }>(url);
        return integrations;
    }

    async function get(integrationId: IntegrationId): Promise<CoverageIntegration> {
        const url = routing.coverageIntegrationsUrl;
        const { integration } = await api.get<{ integration: CoverageIntegration }>(
            `${url}/${integrationId}`,
        );
        return integration;
    }

    async function create(payload: CreateRequest): Promise<CoverageIntegration> {
        const url = routing.coverageIntegrationsUrl;
        const { integration } = await api.post<{ integration: CoverageIntegration }>(url, {
            payload,
        });
        return integration;
    }

    async function update(
        integrationId: IntegrationId,
        payload: UpdateRequest,
    ): Promise<CoverageIntegration> {
        const url = routing.coverageIntegrationsUrl;
        const { integration } = await api.patch<{ integration: CoverageIntegration }>(
            `${url}/${integrationId}`,
            {
                payload,
            },
        );
        return integration;
    }

    async function trigger(integrationId: IntegrationId): Promise<void> {
        const url = routing.coverageIntegrationsUrl;
        return api.post(`${url}/${integrationId}/trigger`);
    }

    async function doDelete(integrationId: IntegrationId): Promise<void> {
        const url = routing.coverageIntegrationsUrl;
        return api.delete(`${url}/${integrationId}`);
    }

    async function listRuns(
        integrationId: IntegrationId,
        options: ListRunsOptions = {},
    ): Promise<ListRunsResponse> {
        const { sortOrder, limit, offset } = options;
        const url = routing.coverageIntegrationsUrl;
        return api.get<ListRunsResponse>(`${url}/${integrationId}/runs`, {
            query: {
                sort: SortOrder.stringify(sortOrder),
                limit,
                offset,
            },
        });
    }

    return {
        list,
        get,
        create,
        update,
        trigger,
        delete: doDelete,
        listRuns,
    };
}
