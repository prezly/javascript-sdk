import { JobState } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';

import { JobStatusResponse } from './types';

export default class Jobs {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    async get(id: string): Promise<JobState> {
        const response = await this.apiClient.get<JobStatusResponse>(`${routing.jobsUrl}/${id}`);
        return response.payload.job.state;
    }
}
