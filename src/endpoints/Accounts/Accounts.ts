import { routing } from '../../routing';
import { DeferredJobsApiClient } from '../../api';
import { UserAccount } from '../../types';
import {
    AccountsCreateRequest,
    AccountsCreateResponse,
    AccountsListResponse,
    AccountsUpdateRequest,
    AccountsUpdateResponse,
} from './types';

export class Accounts {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list(): Promise<AccountsListResponse> {
        const url = routing.accounts;
        return this.apiClient.get<AccountsListResponse>(url);
    }

    async create(payload: AccountsCreateRequest): Promise<AccountsCreateResponse> {
        const url = routing.accounts;
        return this.apiClient.post<AccountsCreateResponse>(url, { payload });
    }

    async update(
        id: UserAccount['id'],
        payload: AccountsUpdateRequest,
    ): Promise<AccountsUpdateResponse> {
        const url = `${routing.accounts}/${id}`;
        return this.apiClient.patch<AccountsUpdateResponse>(url, { payload });
    }
}
