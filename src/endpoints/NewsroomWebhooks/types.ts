import { NewsroomWebhookEvent } from '../../types';

export interface CreateRequest {
    name: string;
    url: string;
    events?: NewsroomWebhookEvent[];
    secret?: string | null;
    is_active?: boolean;
}

export interface UpdateRequest {
    name?: string;
    url?: string;
    events?: NewsroomWebhookEvent[];
    secret?: string | null;
    is_active?: boolean;
}
