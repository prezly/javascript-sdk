import type {
    Category,
    CategoryRef,
    CultureRef,
    ExtendedStory,
    Newsroom,
    NewsroomContactRef,
    Pagination,
    Query,
    SortOrder,
    Story,
} from '../../types';
import { Campaign } from '../../types';

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
 * String-serialized JSON object.
 */
type Json = string;
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

export interface IncludeOptions<Include extends keyof Story.ExtraFields = keyof Story.ExtraFields> {
    include?: Include[];
}

export interface ListOptions<Include extends keyof Story.ExtraFields = keyof Story.ExtraFields> {
    search?: string;
    limit?: number;
    offset?: number;
    sortOrder?: SortOrder | string;
    include?: Include[];
    formats?: Story.FormatVersion[];
}

export interface SearchOptions<Include extends keyof Story.ExtraFields = keyof Story.ExtraFields>
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
    /**
     * Set a custom slug for a Story.
     *
     * - If there is another story with exactly the same slug value, the Create request will throw [HTTP 409 Conflict].
     *
     * - Conflicts can be force-resolved by passing `?force` GET parameter.
     *   This will update other conflicting stories slugs to something else (i.e. adding random suffix).
     */
    slug?: Story['slug'];

    newsroom?: Newsroom['id'] | Newsroom['uuid'];

    published_at?: Iso8601DateTime;
    visibility?: Story.Visibility;
    culture?: CultureRef['code'];

    preview_image?: UploadedImage | null;
    social_image?: UploadedImage | null;
    social_text?: string;

    categories?: Category['id'][];
    tags?: string[];

    is_shared_to_prpro?: boolean;
}

interface GenericUpdateRequest {
    /**
     * Set a custom slug for a Story.
     * Updating it to `null` will revert back to automatically generated slugs.
     *
     * - If there is another story with exactly the same slug value, the Update request will throw [HTTP 409 Conflict].
     *
     * - Conflicts can be force-resolved by passing `?force` GET parameter.
     *   This will update other conflicting stories slugs to something else (i.e. adding random suffix).
     */
    slug?: Story['slug'] | null;

    published_at?: Iso8601DateTime;
    visibility?: Story.Visibility;
    culture?: CultureRef['code'];

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
    };
}

export interface HtmlStoryCreateRequest extends GenericCreateRequest {
    /**
     * If format version is omitted, license default editor version will be implied.
     */
    format_version?: Story.FormatVersion.HTML;
    header_image?: UploadedImage | null;
    title?: string;
    subtitle?: string;
    intro?: Html;
    content?: Html;
    attached_attachments_content?: Json;
    attached_bookmarks_content?: Json;
    attached_contacts_content?: Json;
    attached_gallery_content?: Json;
    attached_videos_content?: Json;
}

export interface SlateV3StoryCreateRequest extends GenericCreateRequest {
    /**
     * If format version is omitted, license default editor version will be implied.
     */
    format_version?: Story.FormatVersion.SLATEJS_V3;
    header_image?: UploadedImage | null;
    title?: string;
    subtitle?: string;
    /**
     * Intro field is not supported for Prezly Content Format stories.
     */
    intro?: never;
    content?: PrezlyContentFormat;
}

export interface SlateV4StoryCreateRequest extends GenericCreateRequest {
    /**
     * If format version is omitted, license default editor version will be implied.
     */
    format_version?: Story.FormatVersion.SLATEJS_V4;
    header_image?: never;
    title?: never;
    subtitle?: never;
    /**
     * Intro field is not supported for Prezly Content Format stories.
     */
    intro?: never;
    content?: PrezlyContentFormat;
}

export interface SlateV5StoryCreateRequest
    extends Omit<SlateV4StoryCreateRequest, 'format_version'> {
    /**
     * If format version is omitted, license default editor version will be implied.
     */
    format_version?: Story.FormatVersion.SLATEJS_V5;
}

export interface HtmlStoryUpdateRequest extends GenericUpdateRequest {
    format_version?: Story.FormatVersion.HTML;
    header_image?: UploadedImage | null;
    title?: string;
    subtitle?: string;
    intro?: Html;
    content?: Html;
    attached_attachments_content?: Json;
    attached_bookmarks_content?: Json;
    attached_contacts_content?: Json;
    attached_gallery_content?: Json;
    attached_videos_content?: Json;
}

export interface SlateV3StoryUpdateRequest extends GenericUpdateRequest {
    format_version?: Story.FormatVersion.SLATEJS_V3;
    header_image?: UploadedImage | null;
    title?: string;
    subtitle?: string;
    /**
     * Intro field is not supported for Prezly Content Format stories.
     */
    intro?: never;
    content?: PrezlyContentFormat;
    autosaved_content?: PrezlyContentFormat;
    content_version?: number;
}

export interface SlateV4StoryUpdateRequest extends GenericUpdateRequest {
    format_version?: Story.FormatVersion.SLATEJS_V4;
    header_image?: never;
    title?: never;
    subtitle?: never;
    /**
     * Intro field is not supported for Prezly Content Format stories.
     */
    intro?: never;
    content?: PrezlyContentFormat;
    autosaved_content?: PrezlyContentFormat;
    content_version?: number;
}

export interface SlateV5StoryUpdateRequest
    extends Omit<SlateV4StoryUpdateRequest, 'format_version'> {
    format_version?: Story.FormatVersion.SLATEJS_V5;
}

export interface PreviewResponse {
    content: {
        'text/html': Html;
        'text/plain': string;
    };
}

export interface PreviewOptions {
    alignment?: Alignment;
    appearance?: Appearance;
}

export import Alignment = Campaign.StoryAlignment;
export import Appearance = Campaign.StoryAppearance;

export type CreateRequest =
    | HtmlStoryCreateRequest
    | SlateV3StoryCreateRequest
    | SlateV4StoryCreateRequest
    | SlateV5StoryCreateRequest;

export type UpdateRequest =
    | HtmlStoryUpdateRequest
    | SlateV3StoryUpdateRequest
    | SlateV4StoryUpdateRequest
    | SlateV5StoryUpdateRequest;

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
    culture?: CultureRef['code'];
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
    attached_videos_content: true,
    attached_bookmarks_content: true,
    attached_attachments_content: true,
    attached_contacts_content: true,
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
