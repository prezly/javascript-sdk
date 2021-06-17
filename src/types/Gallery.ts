import GalleryImage from "./GalleryImage";

export default interface Gallery {
    id: number;
    title: string;
    description: string;
    status: 'private' | 'public';
    created_at: string;
    updated_at: string;
    links: {
        edit_url: string;
        newsroom_url: string;
    },
    images_number: number;
    images: GalleryImage[];
}