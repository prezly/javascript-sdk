import type {
    Category,
    CategoryRef,
    CultureRef,
    ExtendedStory,
    Newsroom,
    NewsroomContactRef,
    Pagination,
    Query,
    Story,
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

interface BaseWarning {
    text: string;
    scope: string;
    field: string;
    value: unknown;
}

interface ChangingNewsroomUnsafeOperationWarning extends BaseWarning {
    scope: 'room_id';
    field: 'room_id';
    value: Newsroom['id'];
}

interface DestinationNewsroomMissingCategoriesWarning extends BaseWarning {
    scope: 'room_id';
    field: 'categories';
    value: CategoryRef[];
}

interface DestinationNewsroomMissingCulturesWarning extends BaseWarning {
    scope: 'room_id';
    field: 'cultures';
    value: CultureRef[];
}

interface StoryTranslationsWillMoveWarning extends BaseWarning {
    scope: 'room_id';
    field: 'translations';
    value: CultureRef[];
}

interface StoryEmbeddedContactsWillBeRemovedWarning extends BaseWarning {
    scope: 'room_id';
    field: 'room_contacts';
    value: NewsroomContactRef[];
}

export type ChangeNewsroomWarning =
    | ChangingNewsroomUnsafeOperationWarning
    | DestinationNewsroomMissingCategoriesWarning
    | DestinationNewsroomMissingCulturesWarning
    | StoryEmbeddedContactsWillBeRemovedWarning
    | StoryTranslationsWillMoveWarning;

export interface IncludeOptions<Include extends readonly (keyof Story.ExtraFields)[]> {
    include?: Include;
}

export interface ListOptions<Include extends readonly (keyof Story.ExtraFields)[]> {
    limit?: number;
    offset?: number;
    sortOrder?: string;
    include?: Include;
}

export interface SearchOptions<Include extends readonly (keyof Story.ExtraFields)[]>
    extends ListOptions<Include> {
    query?: Query;
    scope?: Query;
}

export interface ListResponse<S extends Story = Story> {
    stories: S[];
    pagination: Pagination;
    sort: string;
}

interface GenericCreateRequest {
    newsroom?: Newsroom['id'] | Newsroom['uuid'];

    title?: string;
    subtitle?: string;
    published_at?: Iso8601DateTime;
    visibility?: Story.Visibility;
    culture?: CultureRef['code'];

    header_image?: UploadedImage | null;
    preview_image?: UploadedImage | null;
    social_image?: UploadedImage | null;
    social_text?: string;

    categories?: Category['id'][];
    tags?: string[];

    is_shared_to_prpro?: boolean;
}

interface GenericUpdateRequest {
    title?: string;
    subtitle?: string;
    published_at?: Iso8601DateTime;
    visibility?: Story.Visibility;
    culture?: CultureRef['code'];

    header_image?: UploadedImage | null;
    preview_image?: UploadedImage | null;
    social_image?: UploadedImage | null;
    social_text?: string;

    categories?: Category['id'][];
    tags?: string[];

    is_shared_to_prpro?: boolean;

    seo_settings?: {
        meta_title?: string | null;
        meta_description?: string | null;
        canonical_url?: string | null;
    }
}

export interface HtmlStoryCreateRequest extends GenericCreateRequest {
    /**
     * If format version is omitted, license default editor version will be implied.
     */
    format_version?: Story.FormatVersion.HTML;
    intro?: Html;
    content?: Html;
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
    intro?: never;
    content?: PrezlyContentFormat;
}

export interface HtmlStoryUpdateRequest extends GenericUpdateRequest {
    intro?: Html;
    content?: Html;
    /**
     * Attached gallery slate content.
     */
    attached_gallery_content?: string;
}

export interface SlateStoryUpdateRequest extends GenericUpdateRequest {
    /**
     * Intro field is not supported for Prezly Content Format stories.
     */
    intro?: never;
    content?: PrezlyContentFormat;
    autosaved_content?: PrezlyContentFormat;
    content_version?: number;
}

export type CreateRequest = HtmlStoryCreateRequest | SlateStoryCreateRequest;
export type UpdateRequest = HtmlStoryUpdateRequest | SlateStoryUpdateRequest;

export interface AutosaveRequest {
    autosaved_content: PrezlyContentFormat;
    content_version?: number;
}

export interface RevertRequest {
    content_version?: number;
}

export interface PublishRequest {
    published_at?: Iso8601DateTime;
    visibility?: Story.Visibility.PUBLIC | Story.Visibility.PRIVATE | Story.Visibility.CONFIDENTIAL;
}

export interface UnpublishRequest {
    visibility?: Story.Visibility.PUBLIC | Story.Visibility.PRIVATE | Story.Visibility.CONFIDENTIAL;
}

export interface ScheduleRequest {
    publish_at: Iso8601DateTime;
    visibility?: Story.Visibility.PUBLIC | Story.Visibility.EMBARGO;
}

export type UnscheduleRequest = UnpublishRequest;

export interface TranslateRequest {
    culture: CultureRef['code'];
}

export interface MoveRequest {
    newsroom: Newsroom['uuid'] | Newsroom['id'];
}

export interface ChangeNewsroomSuccessResponse<T extends ExtendedStory> {
    status: 'success';
    story: T;
}

export interface ChangeNewsroomUnsafeResponse {
    status: 'error';
    code: 'unsafe';
    message: string;
    warnings: ChangeNewsroomWarning[];
}

const EXTENDED_STORY_INCLUDED_EXTRA_FIELDS_SHAPE: Record<
    keyof Omit<ExtendedStory, keyof Story>,
    boolean
> = {
    thumbnail_image: true,
    header_image: true,
    preview_image: true,
    social_image: true,
    social_text: true,
    tag_names: true,
    content: true,
    attached_gallery_content: true,
    referenced_entities: true,
}; // satisfies Record<keyof Omit<ExtendedStory, keyof Story>, boolean>; // TODO: Use Typescript `satisfies` operator, when it's out of beta

const ALL_EXTRA_FIELDS_SHAPE: Record<keyof Story.ExtraFields, boolean> = {
    thumbnail_image: true,
    header_image: true,
    preview_image: true,
    social_image: true,
    social_text: true,
    tag_names: true,
    content: true,
    autosaved_content: true,
    content_version: true,
    last_modifying_user: true,
    attached_gallery_content: true,
    referenced_entities: true,
    'campaigns.count': true,
    'pitches.count': true,
}; // satisfies Record<keyof Story.OnDemandFields, boolean>; // TODO: Use Typescript `satisfies` operator, when it's out of beta

export const ALL_EXTRA_FIELDS = Object.keys(
    ALL_EXTRA_FIELDS_SHAPE,
) as (keyof typeof ALL_EXTRA_FIELDS_SHAPE)[];

export const EXTENDED_STORY_INCLUDED_EXTRA_FIELDS = Object.keys(
    EXTENDED_STORY_INCLUDED_EXTRA_FIELDS_SHAPE,
) as (keyof typeof EXTENDED_STORY_INCLUDED_EXTRA_FIELDS_SHAPE)[];
