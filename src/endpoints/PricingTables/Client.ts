import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';

import type { PricingTable } from './types';

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async get(tableId: 'standard'): Promise<PricingTable> {
        const url = routing.pricingTablesUrl.replace(':table_id', String(tableId));
        const { table } = await this.apiClient.get<{ table: PricingTable }>(url);
        return table;
    }
}
