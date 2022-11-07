import type { UploadedImage } from '@prezly/uploads';

import type { CultureRef } from './Culture';

export interface NewsroomContactRef {
    uuid: string;
    /**
     * @deprecated Please use `uuid` as identifier.
     * @see uuid
     */
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    mobile: string | null;
    company: string | null;
    description: string | null;
    website: string | null;
    twitter: string | null;
    facebook: string | null;
    avatar_url: string | null;
}

// TODO: Add `avatar_url` to the full NewsroomContact API object presentation
export interface NewsroomContact extends Omit<NewsroomContactRef, 'avatar_url'> {
    avatar_image: UploadedImage | null;
    /**
     * Featured contacts are listed on the newsroom homepage.
     */
    is_featured: boolean;
    /**
     * List of locales this contact can be displayed for.
     */
    display_locales: CultureRef[];
}
