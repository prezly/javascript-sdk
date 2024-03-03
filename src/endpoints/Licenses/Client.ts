import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { License } from '../../types';

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function get(): Promise<License> {
        const url = routing.licenseUrl;
        const { license } = await api.get<{ license: License }>(`${url}/self`);
        return license;
    }

    return { get };
}
