import type { NotificationSubscription } from '../../types';

export interface UpdateRequest {
    subscriptions: Pick<NotificationSubscription, 'notification_type' | 'is_email_subscribed'>[];
}

/**
 * @deprecated This is a BC alias to `UpdateRequest`. Please use `UpdateRequest` directly instead.
 * @see UpdateRequest
 */
export type NotificationSubscriptionsUpdateRequest = UpdateRequest;
