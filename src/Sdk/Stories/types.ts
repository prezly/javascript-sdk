import {
    Category,
    CultureRef,
    ExtraStoryFields,
    NewsroomRef,
    Pagination,
    Story,
    StoryFormatVersion,
    StoryVisibility,
} from '../../types';

export type StoriesSearchRequest<Include extends readonly (keyof ExtraStoryFields)[]> = {
    jsonQuery?: string;
    limit?: number;
    offset?: number;
    sortOrder?: string;
    include?: Include;
};
export type StoriesListRequest<Include extends readonly (keyof ExtraStoryFields)[]> = Omit<
    StoriesSearchRequest<Include>,
    'jsonQuery'
>;

export interface StoriesListResponse<S extends Story = Story> {
    stories: S[];
    pagination: Pagination;
    sort: string;
}

interface GenericStoryCreateRequest {
    newsroom?: NewsroomRef['id'];
    culture?: CultureRef['code'];
    categories?: Category['id'][];
    tags?: string[];

    title?: string;
    subtitle?: string;
    /**
     * Uploadcare image JSON string.
     */
    header_image?: string;
    /**
     * Uploadcare image JSON string.
     */
    preview_image?: string;
    /**
     * Uploadcare image JSON string.
     */
    social_image?: string;
    social_text?: string;
    visibility?: StoryVisibility;
    /**
     * ISO 8601 formatted datetime string.
     */
    published_at?: string;
}

export interface HtmlStoryCreateRequest extends GenericStoryCreateRequest {
    /**
     * If field is omitted, license default editor version will be implied.
     */
    format_version?: StoryFormatVersion.HTML;
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
    format_version?: StoryFormatVersion.SLATEJS;
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
