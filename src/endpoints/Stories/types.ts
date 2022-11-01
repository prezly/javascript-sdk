import type { Category, CultureRef, NewsroomRef, Pagination, Query, Story } from '../../types';

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

export interface IncludeOptions<Include extends readonly (keyof Story.OnDemandFields)[]> {
    include?: Include;
}

export interface ListOptions<Include extends readonly (keyof Story.OnDemandFields)[]> {
    limit?: number;
    offset?: number;
    sortOrder?: string;
    include?: Include;
}

export interface SearchOptions<Include extends readonly (keyof Story.OnDemandFields)[]>
    extends ListOptions<Include> {
    query?: Query;
}

export interface ListResponse<S extends Story = Story> {
    stories: S[];
    pagination: Pagination;
    sort: string;
}

interface GenericCreateRequest {
    newsroom?: NewsroomRef['id'];

    title?: string;
    subtitle?: string;
    published_at?: Iso8601DateTime;
    visibility?: Story.Visibility;
    culture?: CultureRef['code'];

    header_image?: UploadedImage;
    preview_image?: UploadedImage;
    social_image?: UploadedImage;
    social_text?: string;

    categories?: Category['id'][];
    tags?: string[];
}

interface GenericUpdateRequest {
    title?: string;
    subtitle?: string;
    published_at?: Iso8601DateTime;
    visibility?: Story.Visibility;
    culture?: CultureRef['code'];

    header_image?: UploadedImage;
    preview_image?: UploadedImage;
    social_image?: UploadedImage;
    social_text?: string;

    categories?: Category['id'][];
    tags?: string[];
}

export interface HtmlStoryCreateRequest extends GenericCreateRequest {
    /**
     * If format version is omitted, license default editor version will be implied.
     */
    format_version?: Story.FormatVersion.HTML;
    intro: Html;
    content: Html;
    /**
     * Attached gallery slate content.
     */
    attached_gallery_content?: string;
}

export interface SlateStoryCreateRequest extends GenericCreateRequest {
    /**
     * If format version is omitted, license default editor version will be implied.
     */
    format_version?: Story.FormatVersion.SLATEJS;
    /**
     * Intro field is not supported for Prezly Content Format stories.
     */
    intro: never;
    content: PrezlyContentFormat;
}

export interface HtmlStoryUpdateRequest extends GenericUpdateRequest {
    intro: Html;
    content: Html;
    /**
     * Attached gallery slate content.
     */
    attached_gallery_content?: string;
}

export interface SlateStoryUpdateRequest extends GenericUpdateRequest {
    /**
     * Intro field is not supported for Prezly Content Format stories.
     */
    intro: never;
    content: PrezlyContentFormat;
}

export type CreateRequest = HtmlStoryCreateRequest | SlateStoryCreateRequest;
export type UpdateRequest = HtmlStoryUpdateRequest | SlateStoryUpdateRequest;
