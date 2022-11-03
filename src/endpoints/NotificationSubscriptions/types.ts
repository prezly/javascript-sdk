import type { NotificationSubscription } from '../../types';

export interface UpdateRequest {
    subscriptions: Pick<NotificationSubscription, 'notification_type' | 'is_email_subscribed'>[];
}
