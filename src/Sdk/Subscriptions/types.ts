import { UploadedImage } from '@prezly/uploads';

import { Contact, ContactType, UnsubscribeReason } from '../../types';

interface Utm {
    utm_id?: string;
    utm_source?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
}

interface Person {
    contact_type: ContactType.PERSON;
    first_name?: Contact['first_name'];
    last_name?: Contact['last_name'];
    gender?: Contact['gender'];
    function_name?: Contact['function_name'];
    organisations?: string[];
}

interface Organisation {
    contact_type: ContactType.ORGANISATION;
    company_name: Contact['company_name'];
}

export interface SubscribeRequest<Type extends ContactType> {
    email_address: string;
    locale?: string;
    url?: string;
    visitor_uid?: string;
    session_uid?: string;
    comment?: string;
    contact?: (Type extends ContactType.PERSON ? Person : Organisation) & {
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
