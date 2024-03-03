import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { JobState } from '../../types';

import type { StatusResponse } from './types';

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function get(id: string): Promise<JobState> {
        const { job } = await api.get<StatusResponse>(`${routing.jobsUrl}/${id}`);
        return job.state;
    }

    return { get };
}
