import type { SEOSettings } from './SEOSettings';

export interface NewsroomCompanyInformation {
    name: string;
    about: string;
    about_plaintext: string;
    // contact info
    email: string | null;
    website: string | null;
    phone: string | null;
    address: string | null;
    // social medias
    twitter: string | null;
    facebook: string | null;
    linkedin: string | null;
    pinterest: string | null;
    youtube: string | null;
    instagram: string | null;
    tiktok: string | null;
    // GDPR
    email_disclaimer: string;
    cookie_statement: string;
    subscribe_disclaimer: string;
    // SEO
    seo_settings: SEOSettings;
}
