export interface SenderAddressCreateRequest {
    sender_name: string;
    sender_email: string;
    is_default?: boolean;
}

export interface SenderAddressUpdateRequest {
    sender_name?: string;
    is_default?: true;
}
