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
    // advanced GDPR-related settings
    /**
     * Only admins are allowed to update this field.
     */
    email_disclaimer: string;
    /**
     * Only admins are allowed to update this field.
     */
    cookie_statement: string;
    /**
     * Only admins are allowed to update this field.
     */
    subscribe_disclaimer: string;
}
