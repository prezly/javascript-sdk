import { NewsroomWebhook } from '../../types';

export interface CreateRequest {
    name: string;
    url: string;
    events?: NewsroomWebhook.Event[];
    secret?: string | null;
    is_active?: boolean;
}

export interface UpdateRequest {
    name?: string;
    url?: string;
    events?: NewsroomWebhook.Event[];
    secret?: string | null;
    is_active?: boolean;
}
