import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { CoverageIntegration, CoverageIntegrationRun } from '../../types';

type IntegrationId = CoverageIntegration['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(integrationId: IntegrationId): Promise<CoverageIntegrationRun[]> {
        const url = routing.coverageIntegrationRunsUrl.replace(
            ':integration_id',
            String(integrationId),
        );
        const { runs } = await api.get<{ runs: CoverageIntegrationRun[] }>(url);
        return runs;
    }

    return {
        list,
    };
}
