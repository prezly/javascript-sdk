import { UploadedImage } from '@prezly/uploads';

export interface NewsroomGalleryImage {
    id: number;
    caption: string;
    created_at: string;
    updated_at: string;
    uploadcare_image: UploadedImage;
}
