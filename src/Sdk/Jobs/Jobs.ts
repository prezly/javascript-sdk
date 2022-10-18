import { JobState } from '../../types';

import routing from '../routing';
import { DeferredJobsApiClient } from '../DeferredJobsApiClient';

import { JobStatusResponse } from './types';

export default class Jobs {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async get(id: string): Promise<JobState> {
        const { job } = await this.apiClient.get<JobStatusResponse>(`${routing.jobsUrl}/${id}`);
        return job.state;
    }
}
