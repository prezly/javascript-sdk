import { License } from '../../types';

import DeferredJobsApiClient from '../DeferredJobsApiClient';
import routing from '../routing';

export default class Licenses {
    private readonly apiClient: DeferredJobsApiClient;

    constructor({ apiClient }: { apiClient: DeferredJobsApiClient }) {
        this.apiClient = apiClient;
    }

    public async get(): Promise<License> {
        const url = routing.licenseUrl;
        const { license } = await this.apiClient.get<{ license: License }>(`${url}/self`);
        return license;
    }
}
