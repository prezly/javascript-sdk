import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { License } from '../../types';

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async get(): Promise<License> {
        const url = routing.licenseUrl;
        const { license } = await this.apiClient.get<{ license: License }>(`${url}/self`);
        return license;
    }
}
