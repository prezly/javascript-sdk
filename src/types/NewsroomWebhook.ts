import WebhookEvent from './WebhookEvent';

export default interface NewsroomWebhook {
    id: string;
    name: string;
    url: string;
    events: WebhookEvent[];
    secret: string | null;
    is_active: boolean;
}
