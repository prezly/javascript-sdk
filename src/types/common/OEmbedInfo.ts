export interface OEmbedInfo {
    version: '1.0';
    url: string;
    type: `${OEmbedInfo.Type}`;

    // generic properties
    title?: string;
    description?: string;
    screenshot_url?: string;
    thumbnail_url?: string;
    thumbnail_width?: number;
    thumbnail_height?: number;
    publication_date?: string; // ISO8601
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

export namespace OEmbedInfo {
    export enum Type {
        LINK = 'link',
        PHOTO = 'photo',
        RICH = 'rich',
        VIDEO = 'video',
    }
}
