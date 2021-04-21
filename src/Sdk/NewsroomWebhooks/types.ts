import { WebhookEvent } from '../../types';

export interface NewsroomWebhookCreateRequest {
    name: string;
    url: string;
    events?: WebhookEvent[];
    secret?: string | null;
    is_active?: boolean;
}

export interface NewsroomWebhookUpdateRequest {
    name?: string;
    url?: string;
    events?: WebhookEvent[];
    secret?: string | null;
    is_active?: boolean;
}
