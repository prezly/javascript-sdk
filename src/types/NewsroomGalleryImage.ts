import { UploadcareImage } from './common';

export default interface NewsroomGalleryImage {
    id: number;
    caption: string;
    created_at: string;
    updated_at: string;
    uploadcare_image: UploadcareImage;
}
