import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';

import type { SignupRequest, SignupResponse } from './types';
import type { Plan } from "../../types";

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async signup(payload: SignupRequest): Promise<SignupResponse> {
        const url = `${routing.billing}/signup`;
        return this.apiClient.post<SignupResponse>(url, { payload });
    }

    async getPlan(): Promise<Plan> {
        const { plan } = await this.apiClient.get<{ plan: Plan }>(
            `${routing.billing}/plan`
        );
        return plan;
    }
}
