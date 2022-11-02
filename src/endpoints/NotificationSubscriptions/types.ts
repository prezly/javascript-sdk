export interface UpdateRequest {
    subscriptions: {
        notification_type: string;
        is_email_subscribed: boolean;
    }[];
}

/**
 * @deprecated This is a BC alias to `UpdateRequest`. Please use `UpdateRequest` directly instead.
 * @see UpdateRequest
 */
export type NotificationSubscriptionsUpdateRequest = UpdateRequest;
