import { Contact, UploadcareImage } from '../../types';

export interface NewsroomSubscriptionCreateRequest {
    email_address: string;
    locale?: string;
    url?: string | null;
    ip_address?: string | null;
    visitor_uid?: string | null;
    session_uid?: string | null;
    contact?: {
        contact_type: Contact['contact_type'];
        company_name: Contact['company_name'];
        first_name?: Contact['first_name'];
        last_name?: Contact['last_name'];
        gender?: Contact['gender'];
        function_name?: Contact['function_name'];
        organisations?: string[];
        avatar_image?: UploadcareImage | null;
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
