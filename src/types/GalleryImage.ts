import UploadcareImage from "./common/UploadcareImage";

export default interface GalleryImage {
    id: number;
    caption: string;
    created_at: string;
    updated_at: string;
    uploadcare_image: UploadcareImage;
}