export interface NotificationSubscriptionsUpdateRequest {
    subscriptions: {
        notification_type: string;
        is_email_subscribed: boolean;
    }[];
}
