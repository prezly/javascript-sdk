import Culture from './Culture';

export interface NewsroomRef {
    id: number;
    display_name: string;
    thumbnail_url: string;
    name: string;
    subdomain: string;
    timezone?: string;
    is_active: boolean;
    is_archived: boolean;
    is_multilingual: boolean;
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
        manual_subscription_management: string;
        privacy_settings: string;
        widget_settings: string;
    };
}

export default interface Newsroom extends NewsroomRef {
    domain: string;
    is_hub: boolean;
    // extended details
    cultures: Culture[];
    campaigns_number: number;
    stories_number: number;
}
