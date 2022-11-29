import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';

import type {
    CheckEmailAvailabilityResponse,
} from './types';

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async checkEmailAvailability(email: string): Promise<CheckEmailAvailabilityResponse> {
        const url = `${routing.signup}/check-availability`;
        return this.apiClient.post<CheckEmailAvailabilityResponse>(url, { payload: { email } })
    }
}
