import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';

import type { PricingTable } from './types';

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async list(): Promise<PricingTable[]> {
        const url = routing.pricingTablesUrl;
        const { tables } = await this.apiClient.get<{ tables: PricingTable[] }>(url);
        return tables;
    }

    public async get(tableId: 'standard'): Promise<PricingTable> {
        const url = routing.pricingTablesUrl;
        const { table } = await this.apiClient.get<{ table: PricingTable }>(`${url}/${tableId}`);
        return table;
    }
}
