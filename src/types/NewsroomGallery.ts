import { GalleryStatus } from './GalleryStatus';
import { NewsroomGalleryImage } from './NewsroomGalleryImage';
import { UserRef } from './UserRef';

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
    status: GalleryStatus;
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
    images: NewsroomGalleryImage[];
}
