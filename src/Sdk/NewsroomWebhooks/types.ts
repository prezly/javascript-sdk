export interface NewsroomWebhookCreateRequest {
    name: string;
    url: string;
    events?: string[];
    secret?: string | null;
    is_active?: boolean;
}

export interface NewsroomWebhookUpdateRequest {
    name?: string;
    url?: string;
    events?: string[];
    secret?: string | null;
    is_active?: boolean;
}
