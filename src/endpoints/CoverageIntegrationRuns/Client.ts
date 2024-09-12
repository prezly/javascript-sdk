import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import { type CoverageIntegration, SortOrder } from '../../types';

import type { ListOptions, ListResponse } from './types';

type IntegrationId = CoverageIntegration['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(
        integrationId: IntegrationId,
        options: ListOptions = {},
    ): Promise<ListResponse> {
        const { sortOrder, limit, offset } = options;
        const url = routing.coverageIntegrationRunsUrl.replace(
            ':integration_id',
            String(integrationId),
        );
        return api.get<ListResponse>(url, {
            query: {
                sort: SortOrder.stringify(sortOrder),
                limit,
                offset,
            },
        });
    }

    return {
        list,
    };
}
