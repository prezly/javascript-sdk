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

/**
 * Uploadcare image JSON string.
 */
type UploadedImage = string;
type Iso8601DateTime = string;
/**
 * Raw HTML string.
 */
type Html = string;
/**
 * String containing Prezly Content Format JSON structure.
 */
type PrezlyContentFormat = string;

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

    title?: string;
    subtitle?: string;
    published_at?: Iso8601DateTime;
    visibility?: StoryVisibility;
    culture?: CultureRef['code'];

    header_image?: UploadedImage;
    preview_image?: UploadedImage;
    social_image?: UploadedImage;
    social_text?: string;

    categories?: Category['id'][];
    tags?: string[];
}

interface GenericStoryUpdateRequest {
    title?: string;
    subtitle?: string;
    published_at?: Iso8601DateTime;
    visibility?: StoryVisibility;
    culture?: CultureRef['code'];

    header_image?: UploadedImage;
    preview_image?: UploadedImage;
    social_image?: UploadedImage;
    social_text?: string;

    categories?: Category['id'][];
    tags?: string[];
}

export interface HtmlStoryCreateRequest extends GenericStoryCreateRequest {
    /**
     * If format version is omitted, license default editor version will be implied.
     */
    format_version?: StoryFormatVersion.HTML;
    intro: Html;
    content: Html;
}

export interface SlateStoryCreateRequest extends GenericStoryCreateRequest {
    /**
     * If format version is omitted, license default editor version will be implied.
     */
    format_version?: StoryFormatVersion.SLATEJS;
    /**
     * Intro field is not supported for Prezly Content Format stories.
     */
    intro: never;
    content: PrezlyContentFormat;
}

export interface HtmlStoryUpdateRequest extends GenericStoryUpdateRequest {
    intro: Html;
    content: Html;
}

export interface SlateStoryUpdateRequest extends GenericStoryUpdateRequest {
    /**
     * Intro field is not supported for Prezly Content Format stories.
     */
    intro: never;
    content: PrezlyContentFormat;
}

export type StoryCreateRequest = HtmlStoryCreateRequest | SlateStoryCreateRequest;
export type StoryUpdateRequest = HtmlStoryUpdateRequest | SlateStoryUpdateRequest;
