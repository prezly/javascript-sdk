import type { NotificationType } from './NotificationType';

export interface NotificationSubscription {
    notification_type: NotificationType;
    is_email_subscribed: boolean;
    is_receiving: boolean;
    missing_permissions: string[];
    missing_features: string[];
}
