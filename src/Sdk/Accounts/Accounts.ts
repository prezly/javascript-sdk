import routing from '../routing';
import DeferredJobsApiClient from '../DeferredJobsApiClient';
import { UserAccount } from '../../types/UserAccount';
import {
    AccountsCreateRequest,
    AccountsListResponse,
    AccountsUpdateRequest,
    AccountsUpdateResponse,
} from './types';

export class Accounts {
    private readonly apiClient: DeferredJobsApiClient;

    constructor({ apiClient }: { apiClient: DeferredJobsApiClient }) {
        this.apiClient = apiClient;
    }

    async list(): Promise<AccountsListResponse> {
        const url = routing.accounts;
        return this.apiClient.get<AccountsListResponse>(url);
    }

    async create(payload: AccountsCreateRequest) {
        const url = routing.accounts;
        return this.apiClient.post<AccountsCreateRequest>(url, { payload });
    }

    async update(id: UserAccount['id'], payload: AccountsUpdateRequest) {
        const url = `${routing.accounts}/${id}`;
        return this.apiClient.patch<AccountsUpdateResponse>(url, { payload });
    }
}
