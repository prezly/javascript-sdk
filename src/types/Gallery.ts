import GalleryImage from "./GalleryImage";
import GalleryStatus from "./GalleryStatus";

export default interface Gallery {
    id: number;
    title: string;
    description: string;
    status: GalleryStatus;
    created_at: string;
    updated_at: string;
    links: {
        edit_url: string;
        newsroom_url: string;
    },
    images_number: number;
    images: GalleryImage[];
}