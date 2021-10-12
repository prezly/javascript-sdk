import { CultureRef, UploadcareImage } from '../../types';

export interface NewsroomContactsListRequestOptions {
    /**
     * Keyword search term
     */
    search?: string;
}

export interface NewsroomContactsSearchRequestOptions {
    /**
     * Keyword search term
     */
    search?: string;
    /**
     * Prezly Query Language expression to filter contacts by.
     */
    query?: string;
}

export interface NewsroomContactCreateRequest {
    name: string;
    email?: string | null;
    phone?: string | null;
    mobile?: string | null;
    company?: string | null;
    description?: string | null;
    website?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    avatar_image?: UploadcareImage | null;
    is_featured?: boolean;
    display_locales?: CultureRef['code'][];
}

export type NewsroomContactUpdateRequest = Partial<NewsroomContactCreateRequest>;
