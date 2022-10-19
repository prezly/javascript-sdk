export interface CreateRequest {
    sender_name: string;
    sender_email: string;
    is_default?: boolean;
}

export interface UpdateRequest {
    sender_name?: string;
    is_default?: true;
}
