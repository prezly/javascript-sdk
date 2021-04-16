import { Event } from './enums';

export default interface NewsroomWebhook {
    id: string;
    name: string;
    url: string;
    events: Event[];
    secret: string | null;
    is_active: boolean;
}
