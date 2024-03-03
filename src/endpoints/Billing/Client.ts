import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Plan } from '../../types';

import type { SignupRequest, SignupResponse } from './types';

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function signup(payload: SignupRequest): Promise<SignupResponse> {
        const url = `${routing.billing}/signup`;
        return api.post<SignupResponse>(url, { payload });
    }

    async function getPlan(): Promise<Plan> {
        const { plan } = await api.get<{ plan: Plan }>(`${routing.billing}/plan`);
        return plan;
    }

    return {
        signup,
        getPlan,
    };
}
