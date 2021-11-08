import { NewsroomWebhookEvent } from '../../types';

export interface NewsroomWebhookCreateRequest {
    name: string;
    url: string;
    events?: NewsroomWebhookEvent[];
    secret?: string | null;
    is_active?: boolean;
}

export interface NewsroomWebhookUpdateRequest {
    name?: string;
    url?: string;
    events?: NewsroomWebhookEvent[];
    secret?: string | null;
    is_active?: boolean;
}
