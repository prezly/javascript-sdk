import type { UploadedImage } from '@prezly/uploads';

import type { Contact } from '../../types';

export interface CreateRequest {
    email_address: string;
    locale?: string;
    url?: string;
    ip_address?: string;
    visitor_uid?: string;
    session_uid?: string;
    contact?: {
        contact_type: Contact['contact_type'];
        /**
         * Required only when contact_type === 'organisation'
         */
        company_name?: Contact['company_name'];
        /**
         * Required only when contact_type === 'person'
         */
        first_name?: Contact['first_name'];
        /**
         * Required only when contact_type === 'person'
         */
        last_name?: Contact['last_name'];
        /**
         * Required only when contact_type === 'person'
         */
        gender?: Contact['gender'];
        /**
         * Required only when contact_type === 'person'
         */
        function_name?: Contact['function_name'];
        /**
         * Required only when contact_type === 'person'
         */
        organisations?: string[];
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
        address?: {
            street?: Contact['address']['street'];
            number?: Contact['address']['number'];
            box?: Contact['address']['box'];
            zip?: Contact['address']['zip'];
            city?: Contact['address']['city'];
            region?: Contact['address']['region'];
            country?: Contact['address']['country'];
        };
    };
}
