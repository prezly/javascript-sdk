export interface NotificationSubscription {
    notification_type: NotificationSubscription.Type;

    is_email_subscribed: boolean;
    is_email_required: boolean;
    is_receiving_email: boolean;

    is_receiving: boolean;

    missing_permissions: string[];
    missing_features: string[];
}

export namespace NotificationSubscription {
    export interface Type {
        id: string;
        title: string;
        description: string | null;
        area: Area;
    }

    export enum Area {
        SITES = 'Sites',
        CAMPAIGNS = 'Campaigns',
        CONTACTS = 'Contacts',
        BILLING_AND_LEGAL = 'Billing & Legal',
        ORGANIZATION_AND_LEGAL = 'Organization & Legal',
    }
}
