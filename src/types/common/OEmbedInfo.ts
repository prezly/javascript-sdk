export interface OEmbedInfo {
    version: '1.0';
    url: string;
    type: 'video' | 'photo' | 'rich' | 'link';

    // generic properties
    title?: string;
    description?: string;
    screenshot_url?: string;
    thumbnail_url?: string;
    thumbnail_width?: string;
    thumbnail_height?: string;
    author_name?: string;
    author_url?: string;
    provider_name?: string;
    provider_url?: string;
    cache_age?: number;

    // video, photo & rich types
    html?: string;
    width?: number;
    height?: number;
}
