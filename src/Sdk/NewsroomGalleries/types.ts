import { GalleryStatus } from '../../types';

export interface GalleryCreateRequest {
    name: string;
}

export interface GalleryUpdateRequest {
    name?: string;
    visibility?: GalleryStatus;
    thumbnail_size?: 'XS' | 'S' | 'M' | 'L' | 'XL';
    padding?: 'XS' | 'S' | 'M' | 'L' | 'XL';
}
