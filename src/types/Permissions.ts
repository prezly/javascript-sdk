export enum Permission {
    CREATE_NEWSROOM = 'create_newsroom',
    EXPORT_CONTACTS = 'export_contacts',
    MANAGE_BILLING = 'manage_billing',
    MANAGE_EMAILS = 'manage_emails',
    MANAGE_USERS = 'manage_users',
    VIEW_CONTACTS = 'view_contacts',
    CREATE_SENDER_ADDRESS = 'create_sender_address',
    SEND_EMAILS = 'send_emails',
}

export type PermissionsMap = Partial<{ [key in Permission]: true }>;
