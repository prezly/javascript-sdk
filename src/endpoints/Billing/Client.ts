import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';

import type { SignupRequest, SignupResponse } from './types';

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async signup(payload: SignupRequest): Promise<SignupResponse> {
        const url = routing.billing;
        return this.apiClient.post<SignupResponse>(url, { payload });
    }
}
