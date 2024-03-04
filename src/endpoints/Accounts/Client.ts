import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { UserAccount } from '../../types';

import type {
    CreateRequest,
    CreateResponse,
    ListResponse,
    UpdateRequest,
    UpdateResponse,
} from './types';

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(): Promise<ListResponse> {
        const url = routing.accounts;
        return api.get<ListResponse>(url);
    }

    async function create(payload: CreateRequest): Promise<CreateResponse> {
        const url = routing.accounts;
        return api.post<CreateResponse>(url, { payload });
    }

    async function update(id: UserAccount['id'], payload: UpdateRequest): Promise<UpdateResponse> {
        const url = `${routing.accounts}/${id}`;
        return api.patch<UpdateResponse>(url, { payload });
    }

    return {
        list,
        create,
        update,
    };
}
