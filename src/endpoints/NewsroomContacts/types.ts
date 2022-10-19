import type { UploadedImage } from '@prezly/uploads';

import type { CultureRef, Query } from '../../types';

export interface ListOptions {
    /**
     * Keyword search term
     */
    search?: string;
}

export interface SearchOptions extends ListOptions {
    /**
     * Prezly Query Language expression to filter contacts by.
     */
    query?: Query;
}

export interface CreateRequest {
    name: string;
    email?: string | null;
    phone?: string | null;
    mobile?: string | null;
    company?: string | null;
    description?: string | null;
    website?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    avatar_image?: UploadedImage | null;
    is_featured?: boolean;
    display_locales?: CultureRef['code'][];
}

export type UpdateRequest = Partial<CreateRequest>;
