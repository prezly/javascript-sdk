import type { UploadedImage } from '@prezly/uploads';

import type { Contact, Utm } from '../../types';

interface Person {
    contact_type: Contact.Type.PERSON;
    first_name?: Contact['first_name'];
    last_name?: Contact['last_name'];
    gender?: Contact['gender'];
    function_name?: Contact['function_name'];
    organisations?: string[];
}

interface Organisation {
    contact_type: Contact.Type.ORGANISATION;
    company_name: Contact['company_name'];
}

export interface SubscribeRequest<Type extends Contact.Type> {
    email_address: string;
    first_name?: string | null;
    last_name?: string | null;
    locale?: string;
    url?: string;
    visitor_uid?: string;
    session_uid?: string;
    comment?: string;
    contact?: (Type extends Contact.Type.PERSON ? Person : Organisation) & {
        avatar_image?: UploadedImage | null;
        languages?: string[];
        emails?: Contact['emails'];
        phone_numbers?: Contact['phone_numbers'];
        urls?: Contact['urls'];
        social_accounts?: Contact['social'][];
        tags?: Contact['tags'];
        periodicity?: Contact['periodicity'];
        medium_types?: Contact['medium_types'];
        salutation?: Contact['salutation'];
        address?: Partial<Contact['address']>;
    };
}

export enum UnsubscribeReason {
    UNKNOWN = 'unknown',
    UNWANTED = 'unwanted',
    SPAM = 'spam',
    NEVER_SIGNED_UP = 'never_signed_up',
    OTHER = 'other',
}

export interface UnsubscribeRequest {
    /**
     * Either utm.utm_id or email_address must be provided
     */
    email_address?: string;
    utm?: Utm;
    locale?: string;
    url?: string;
    visitor_uid?: string;
    session_uid?: string;
    comment?: string;
    reason?: UnsubscribeReason;
}

export interface UpdateUnsubscribeDetailsRequest {
    locale?: string;
    url?: string;
    visitor_uid?: string;
    session_uid?: string;
    comment?: string;
    reason?: UnsubscribeReason;
}
