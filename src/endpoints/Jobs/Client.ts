import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { JobState } from '../../types';


import type { StatusResponse } from './types';

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async get(id: string): Promise<JobState> {
        const { job } = await this.apiClient.get<StatusResponse>(`${routing.jobsUrl}/${id}`);
        return job.state;
    }
}
