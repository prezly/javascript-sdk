import { WebhookEvent } from './WebhookEvent';

export interface NewsroomWebhook {
    id: string;
    name: string;
    url: string;
    events: WebhookEvent[];
    secret: string | null;
    is_active: boolean;
}
