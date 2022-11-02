import type { NotificationTypeArea } from './NotificationTypeArea';

export interface NotificationType {
    id: string;
    title: string;
    description: string | null;
    area: NotificationTypeArea;
}
