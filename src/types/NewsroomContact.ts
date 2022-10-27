import type { UploadedImage } from '@prezly/uploads';

import type { CultureRef } from './Culture';
import type { Entity } from './Entity';

export interface NewsroomContact extends Entity<number> {
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
