import GalleryStatus from './GalleryStatus';
import NewsroomGalleryImage from './NewsroomGalleryImage';

export default interface NewsroomGallery {
    id: number;
    uuid: string;
    title: string;
    status: GalleryStatus;
    created_at: string;
    updated_at: string;
    uploadcare_group_uuid: string | null;
    content: string;
    images_number: number;
    images: NewsroomGalleryImage[];
}
