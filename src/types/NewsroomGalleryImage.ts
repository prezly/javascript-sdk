import { UploadedImage } from './common';

export interface NewsroomGalleryImage {
    id: number;
    caption: string;
    created_at: string;
    updated_at: string;
    uploadcare_image: UploadedImage;
}
