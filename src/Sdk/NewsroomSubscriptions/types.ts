import { Contact, UploadcareImage } from '../../types';

export interface NewsroomSubscriptionCreateRequest {
    email_address: string;
    locale?: string | null;
    contact?: {
        contact_type: Contact['contact_type'];
        company_name: Contact['company_name'];
        first_name: Contact['first_name'];
        last_name: Contact['last_name'];
        gender: Contact['gender'];
        function_name: Contact['function_name'];
        organisations: string[];
        avatar_image: UploadcareImage | null;
        languages: string[];
        emails: string[];
        phone_nubmers: Contact['phone_numbers'];
        urls: Contact['urls'];
        social_accounts: Contact['social'][];
        tags: Contact['tags'];
        periodicity: Contact['periodicity'];
        medium_types: Contact['medium_types'];
        salutation: string;
        address: Contact['address'];
    };
}
