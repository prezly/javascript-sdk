import type { UploadedImage } from '@prezly/uploads';

import type { UserRef } from './User';

export interface NewsroomGallery {
    id: number;
    uuid: string;
    name: string;
    /** @deprecated Use `name` instead */
    title: string;
    description: string | null;
    /**
     * Uploadcare image JSON.
     */
    thumbnail_image: string | null;
    url: string;
    status: NewsroomGallery.Status;
    creator: UserRef | null;
    created_at: string;
    updated_at: string;
    modified_at: string | null;
    uploadcare_group_uuid: string | null;
    /**
     * Slate JSON content.
     */
    content: string;
    images_number: number;
    images: NewsroomGallery.Image[];
}

export namespace NewsroomGallery {
    export enum Status {
        PRIVATE = 'private',
        PUBLIC = 'public',
    }

    export interface Image {
        id: number;
        caption: string;
        created_at: string;
        updated_at: string;
        uploadcare_image: UploadedImage;
    }
}
