import type { Contact, ContactRef } from './Contact';

export interface EmailRecipientRef {
    /**
     * Unique alphanumerical identifier for the recipient.
     */
    id: string;
    display_name: string;
    avatar_url: string;
    contact: ContactRef;
    /**
     * Email address the email will be sent to. One of the contact email addresses.
     */
    email_address: string;
    /**
     * The current recipient email address is unsubscribed from the current campaign newsroom.
     */
    is_unsubscribed: boolean;
    /**
     * The current recipient email address is unsubscribed from all your Prezly communications.
     */
    is_unsubscribed_from_all_communications: boolean;
}

export interface EmailRecipient extends EmailRecipientRef {
    contact: Contact;
    /**
     * List of all contact email addresses with their statuses in context of the current campaign.
     */
    email_addresses: EmailRecipient.EmailAddressRecord[];

    /**
     * List of known problems detected for the recipient with its currently selected email address.
     */
    problems: EmailRecipient.Problem[];
}

export namespace EmailRecipient {
    export enum Problem {
        BOUNCED = 'bounced',
        UNSUBSCRIBED = 'unsubscribed',
        UNSUBSCRIBED_FROM_ALL_COMMUNICATIONS = 'unsubscribed_from_all_communications',
        DUPLICATE = 'duplicate',
    }

    export enum EmailAddressStatus {
        OK = 'ok',
        BOUNCED = 'bounced',
        UNSUBSCRIBED = 'unsubscribed',
        UNSUBSCRIBED_FROM_ALL_COMMUNICATIONS = 'unsubscribed_from_all_communications',
    }

    export interface EmailAddressRecord {
        email_address: string;
        status: EmailAddressStatus;
    }
}
