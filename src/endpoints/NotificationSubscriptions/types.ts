import type { NotificationSubscription } from '../../types';

interface SubscriptionUpdate {
    notification_type: NotificationSubscription.Type['id'];
    is_email_subscribed: NotificationSubscription['is_email_required'];
}

export interface UpdateRequest {
    subscriptions: SubscriptionUpdate[];
}
