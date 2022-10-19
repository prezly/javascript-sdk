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

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list(): Promise<ListResponse> {
        const url = routing.accounts;
        return this.apiClient.get<ListResponse>(url);
    }

    async create(payload: CreateRequest): Promise<CreateResponse> {
        const url = routing.accounts;
        return this.apiClient.post<CreateResponse>(url, { payload });
    }

    async update(id: UserAccount['id'], payload: UpdateRequest): Promise<UpdateResponse> {
        const url = `${routing.accounts}/${id}`;
        return this.apiClient.patch<UpdateResponse>(url, { payload });
    }
}
