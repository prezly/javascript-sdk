import CultureRef from './CultureRef';
import { UploadcareImageStoragePayload } from '@prezly/slate-types';
import EmailBranding from './EmailBranding';
import EmailBrandingMode from './EmailBrandingMode';

export interface NewsroomRef {
    uuid: string;
    /**
     * @deprecated Please use `uuid` instead.
     * @see uuid
     */
    id: number;
    display_name: string;
    thumbnail_url: string;
    name: string;
    subdomain: string;

    is_active: boolean;
    is_archived: boolean;
    is_multilingual: boolean;
    is_indexable: boolean;

    /**
     * Timezone name in the ICANN tz database.
     */
    timezone: string;
    /**
     * Moment.js time format.
     */
    time_format: string;
    /**
     * Moment.js date format.
     */
    date_format: string;

    /**
     * @deprecated Please use `is_online` instead.
     * @see is_online
     */
    is_offline: boolean;
    is_online: boolean;
    url: string;
    /**
     * @deprecated Do not rely on these.
     */
    links: {
        media_gallery_api: string;
        room_contacts_api: string;
        analytics_and_visibility_settings: string;
        categories_management: string;
        company_info_settings: string;
        contacts_management: string;
        domain_settings: string;
        edit: string;
        gallery_management: string;
        hub_settings: string;
        languages: string;
        look_and_feel_settings: string;
        /**
         * @deprecated
         */
        manual_subscription_management: string;
        privacy_settings: string;
        widget_settings: string;
    };
}

export default interface Newsroom extends NewsroomRef {
    domain: string;
    is_hub: boolean;
    // extended details
    cultures: CultureRef[];
    campaigns_number: number;
    stories_number: number;
    // assets
    square_logo: UploadcareImageStoragePayload | null;
    newsroom_logo: UploadcareImageStoragePayload | null;
    icon: UploadcareImageStoragePayload | null;

    email_branding_mode: EmailBrandingMode;
    email_branding: EmailBranding;

    is_privacy_portal_enabled: boolean;
}
