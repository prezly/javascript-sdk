import { GalleryStatus } from './GalleryStatus';
import { NewsroomGalleryImage } from './NewsroomGalleryImage';
import { UserRef } from './UserRef';
import { UploadedImage } from '@prezly/uploads';

export interface NewsroomGallery {
    id: number;
    uuid: string;
    name: string;
    /** @deprecated Use `name` instead */
    title: string;
    description: string | null;
    thumbnail_image: UploadedImage | null;
    url: string;
    status: GalleryStatus;
    creator: UserRef | null;
    created_at: string;
    updated_at: string;
    modified_at: string | null;
    uploadcare_group_uuid: string | null;
    content: string;
    images_number: number;
    images: NewsroomGalleryImage[];
}
