import { UserAccount } from '../../types';

export interface ListResponse {
    accounts: UserAccount[];
}

export interface CreateRequest {
    company_name: string;
}

export interface CreateResponse {
    activation_url: string;
}

export interface UpdateRequest {
    show_in_menu: boolean;
}

export interface UpdateResponse {
    account: UserAccount;
}
