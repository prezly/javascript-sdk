export default interface NewsroomWebhook {
    id: string;
    name: string;
    url: string;
    events: string[];
    secret: string|null;
    is_active: boolean;
}
