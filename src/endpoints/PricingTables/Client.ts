import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';

import type { PricingTable } from './types';
import type { TableId } from './types';

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(): Promise<PricingTable[]> {
        const url = routing.pricingTablesUrl;
        const { tables } = await api.get<{ tables: PricingTable[] }>(url);
        return tables;
    }

    async function get(tableId: TableId.STANDARD): Promise<PricingTable> {
        const url = routing.pricingTablesUrl;
        const { table } = await api.get<{ table: PricingTable }>(`${url}/${tableId}`);
        return table;
    }

    return {
        list,
        get,
    };
}
