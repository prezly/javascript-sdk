import { UserAccount } from "../../types/UserAccount";

export interface AccountsListResponse {
    accounts: UserAccount[];
}

export interface AccountsCreateRequest {
    company_name: string;
}

export interface AccountsCreateResponse {
    activation_url: string;
}

export interface AccountsUpdateRequest {
    show_in_menu: boolean;
}

export interface AccountsUpdateResponse {
    account: UserAccount;
}
