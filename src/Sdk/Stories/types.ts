import { Category, Culture, NewsroomRef, Pagination, Story, StoryFormatVersion, StoryVisibility } from '../../types';

export interface StoriesListRequest {
    limit?: number;
    offset?: number;
    sortOrder?: string;
}
export interface StoriesSearchRequest extends StoriesListRequest {
    /**
     * Filter query using Prezly JSON Query Language
     */
    jsonQuery?: string;
}

export interface StoriesListResponse {
    stories: Story[];
    pagination: Pagination;
    sort: string;
}

interface GenericStoryCreateRequest {
    newsroom?: NewsroomRef['id'],
    culture?: Culture['code'],
    categories?: Category['id'][],
    tags?: string[],

    title?: string,
    subtitle?: string,
    /**
     * Uploadcare image JSON string.
     */
    header_image?: string,
    /**
     * Uploadcare image JSON string.
     */
    preview_image?: string,
    /**
     * Uploadcare image JSON string.
     */
    social_image?: string,
    social_text?: string,
    visibility?: StoryVisibility,
    /**
     * ISO 8601 formatted datetime string.
     */
    published_at?: string,
}

export interface HtmlStoryCreateRequest extends GenericStoryCreateRequest {
    /**
     * If field is omitted, license default editor version will be implied.
     */
    format_version?: StoryFormatVersion.HTML,
    /**
     * Intro field is only supported for HTML stories.
     */
    intro: string;
    /**
     * Content HTML string.
     */
    content: string;
}

export interface SlateStoryCreateRequest extends GenericStoryCreateRequest {
    /**
     * If field is omitted, license default editor version will be implied.
     */
    format_version?: StoryFormatVersion.SLATEJS,
    /**
     * Intro field is not supported for Slate stories.
     */
    intro: never;
    /**
     * Content JSON string.
     */
    content: string;
}

export type StoryCreateRequest = HtmlStoryCreateRequest | SlateStoryCreateRequest;
