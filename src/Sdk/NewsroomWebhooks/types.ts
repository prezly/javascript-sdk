import { Event } from "../../types/enums";

export interface NewsroomWebhookCreateRequest {
    name: string;
    url: string;
    events?: Event[];
    secret?: string | null;
    is_active?: boolean;
}

export interface NewsroomWebhookUpdateRequest {
    name?: string;
    url?: string;
    events?: Event[];
    secret?: string | null;
    is_active?: boolean;
}
