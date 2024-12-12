import type { Category } from './Category';
import type { OEmbedInfo } from './common';
import type { CoverageEntry } from './CoverageEntry';
import type { CultureRef } from './Culture';
import { Newsroom, type NewsroomRef } from './Newsroom';
import type { SEOSettings } from './SEOSettings';
import type { UserRef } from './User';

type Html = string;
type Json = string;

export interface StoryRef {
    uuid: string;
    /**
     * @deprecated Please use `uuid` as an identifier instead.
     * @see uuid
     */
    id: number;
    title: string;
    slug: string;

    status: Story.Status;
    /**
     * @deprecated Please use `status` instead.
     * @see status
     * @see Story.Status
     */
    lifecycle_status: Story.LifecycleStatus;
    /**
     * @deprecated Please use `status` instead.
     * @see status
     * @see Story.Status
     */
    publication_status: Story.PublicationStatus;

    visibility: Story.Visibility;

    thumbnail_url: string;

    created_at: string;
    updated_at: string;
    published_at: string | null;
    scheduled_at: string | null;

    culture: CultureRef;
    author: UserRef | null;
    newsroom: NewsroomRef;
    oembed: OEmbedInfo;

    links: {
        newsroom_view: string | null;
    };
}

export interface Story {
    uuid: string;
    /**
     * @deprecated Please use `uuid` as an identifier instead.
     * @see uuid
     */
    id: number;
    title: string;
    subtitle: string;
    intro: string;
    summary: string;
    /**
     * The effective Story slug.
     * Calculated as `custom_slug ?? auto_slug`.
     */
    slug: string;
    /**
     * Automatically generated Story slug.
     */
    auto_slug: string;
    /**
     * Custom-set Story slug.
     */
    custom_slug: string | null;
    format_version: Story.FormatVersion;
    culture: CultureRef;
    author: UserRef | null;

    links: {
        short: string | null;
        newsroom_view: string | null;
        newsroom_preview: string;
    };

    newsroom: NewsroomRef;
    categories: Category[];
    translations: StoryRef[];
    oembed: OEmbedInfo;

    coverage_number: number;
    auto_matched_coverage_number: number;
    language: string;
    last_coverage_at: string | null;

    thumbnail_url: string;
    created_at: string;
    updated_at: string;
    published_at: string | null;
    scheduled_at: string | null;

    status: Story.Status;
    /**
     * @deprecated Please use `status` instead.
     */
    lifecycle_status: Story.Status;
    /**
     * @deprecated Please use `newsroom.status` instead.
     * @see newsroom
     * @see Newsroom.Status
     */
    is_archived: boolean;
    /**
     * @deprecated Please use `status` instead.
     * @see status
     * @see Story.Status
     */
    is_finalized: boolean;
    /**
     * @deprecated Please use `status` instead.
     * @see status
     * @see Story.Status
     */
    is_published: boolean;
    /**
     * @deprecated Please use `status` instead.
     * @see status
     * @see Story.Status
     */
    is_draft: boolean;
    /**
     * @deprecated Please use `status` instead.
     * @see status
     * @see Story.Status
     */
    is_embargo: boolean;
    /**
     * @deprecated Please use `visibility` instead.
     * @see visibility
     * @see Story.Visibility
     */
    is_private: boolean;
    /**
     * @deprecated Please use `status` instead.
     * @see status
     * @see Story.Status
     */
    is_scheduled: boolean;
    is_sharable: boolean;
    is_analytics_available: boolean;
    is_shared_to_prpro: boolean;
    is_demo: boolean;

    /**
     * @deprecated Please use `status` instead.
     * @see status
     * @see Story.Status
     */
    publication_status: Story.PublicationStatus;
    visibility: Story.Visibility;

    is_pinned: boolean;
    pinned_by: UserRef | null;

    seo_settings: SEOSettings;
}

export namespace Story {
    export enum FormatVersion {
        HTML = 1,
        SLATEJS_V3 = 3,
        SLATEJS_V4 = 4,
        SLATEJS_V5 = 5,
        SLATEJS_V6 = 6,
    }

    export enum Status {
        UNINITIALIZED = 'uninitialized',
        DRAFT = 'draft',
        SCHEDULED = 'scheduled',
        EMBARGO = 'embargo',
        PUBLISHED = 'published',
    }

    /**
     * @deprecated Please use `Status` instead.
     * @see Status
     */
    export const LifecycleStatus = Status;
    export type LifecycleStatus = Status;

    /**
     * @deprecated Please use `Status` instead.
     * @see Status
     */
    export enum PublicationStatus {
        NEW = 'new',
        DRAFT = 'draft',
        PUBLISHED = 'published',
    }

    export enum Visibility {
        PUBLIC = 'public',
        EMBARGO = 'embargo',
        PRIVATE = 'private',
        CONFIDENTIAL = 'confidential',
    }

    export interface ExtraFields {
        /**
         * Uploadcare image JSON.
         */
        thumbnail_image: string | null;
        /**
         * Uploadcare image JSON.
         */
        header_image: string | null;
        /**
         * Uploadcare image JSON.
         */
        preview_image: string | null;
        /**
         * Uploadcare image JSON.
         */
        social_image: string | null;
        social_text: string;
        tag_names: string[];

        /**
         * Depending on `format_version` this field can contain:
         * - HTML content for v1 stories (deprecated)
         * - JSON-encoded structured content for v3 stories (see Prezly Content Format).
         */
        content: Html | Json;

        /**
         * Only supported on v3 stories with JSON-encoded structured content.
         */
        autosaved_content: Json | null;

        /**
         * Auto-incrementing version number updated on every update.
         * Used for detecting multiple users editing the same story simultaneously.
         */
        content_version: number;

        /**
         * User who performed the latest update on the story.
         */
        last_modifying_user: UserRef | null;

        /**
         * Contains attached gallery slate content.
         * Always `null` for v3 stories.
         */
        attached_gallery_content: Json | null;

        /**
         * Contains attached videos slate content.
         * Always `null` for v3 stories.
         */
        attached_videos_content: Json | null;

        /**
         * Contains attached bookmarks slate content.
         * Always `null` for v3 stories.
         */
        attached_bookmarks_content: Json | null;

        /**
         * Contains attached files slate content.
         * Always `null` for v3 stories.
         */
        attached_attachments_content: Json | null;

        /**
         * Contains attached contacts slate content.
         * Always `null` for v3 stories.
         */
        attached_contacts_content: Json | null;

        referenced_entities: {
            stories: Record<string, OEmbedInfo>;
            coverages: Record<number, CoverageEntry>;
        };

        /**
         * Number of campaigns linked to this story.
         */
        'campaigns.count': number;

        /**
         * Number of pitches linked to this story.
         */
        'pitches.count': number;
    }

    /*
     * Newsroom status checks
     */

    export function isActiveNewsroom(story: Pick<Story, 'newsroom'>): boolean {
        return Newsroom.isActive(story.newsroom);
    }

    export function isInactiveNewsroom(story: Pick<Story, 'newsroom'>): boolean {
        return Newsroom.isInactive(story.newsroom);
    }

    export function isArchivedNewsroom(story: Pick<Story, 'newsroom'>): boolean {
        return Newsroom.isArchived(story.newsroom);
    }

    /*
     * Lifecycle status checks
     */

    export function isUninitialized(status: Status): status is Status.UNINITIALIZED;
    export function isUninitialized<T extends Pick<Story, 'status'>>(
        story: T,
    ): story is T & {
        status: Status.UNINITIALIZED;
    };
    export function isUninitialized<T extends Pick<Story, 'status'>>(arg: Status | T): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return isUninitialized(arg.status);
        }
        return arg === Status.UNINITIALIZED;
    }

    export function isDraft(status: Status): status is Status.DRAFT;
    export function isDraft<T extends Pick<Story, 'status'>>(
        story: T,
    ): story is T & {
        status: Status.DRAFT;
    };
    export function isDraft<T extends Pick<Story, 'status'>>(arg: Status | T): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return isDraft(arg.status);
        }
        return arg === Status.DRAFT;
    }

    export function isUninitializedOrDraft(
        status: Status,
    ): status is Status.UNINITIALIZED | Status.DRAFT;
    export function isUninitializedOrDraft<T extends Pick<Story, 'status'>>(
        story: T,
    ): story is T & {
        status: Status.UNINITIALIZED | Status.DRAFT;
    };
    export function isUninitializedOrDraft<T extends Pick<Story, 'status'>>(
        arg: Status | T,
    ): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return isUninitializedOrDraft(arg.status);
        }
        return arg === Status.UNINITIALIZED || arg === Status.DRAFT;
    }

    export function isScheduled(status: Status): status is Status.SCHEDULED;
    export function isScheduled<T extends Pick<Story, 'status'>>(
        story: T,
    ): story is T & { status: Status.SCHEDULED };
    export function isScheduled<T extends Pick<Story, 'status'>>(arg: Status | T): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return isScheduled(arg.status);
        }
        return arg === Status.SCHEDULED;
    }

    export function isScheduledEmbargo(status: Status): status is Status.EMBARGO;
    export function isScheduledEmbargo<T extends Pick<Story, 'status'>>(
        story: T,
    ): story is T & {
        status: Status.EMBARGO;
    };
    export function isScheduledEmbargo<T extends Pick<Story, 'status'>>(arg: Status | T): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return isScheduledEmbargo(arg.status);
        }
        return arg === Status.EMBARGO;
    }

    export function isPublished(status: Status): status is Status.PUBLISHED;
    export function isPublished<T extends Pick<Story, 'status'>>(
        story: T,
    ): story is T & { status: Status.PUBLISHED };
    export function isPublished<T extends Pick<Story, 'status'>>(arg: Status | T): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return isPublished(arg.status);
        }
        return arg === Status.PUBLISHED;
    }

    /*
     * Format version checks
     */

    export function isLegacyHtmlFormat(format: FormatVersion): format is FormatVersion.HTML;
    export function isLegacyHtmlFormat<T extends Pick<Story, 'format_version'>>(
        story: T,
    ): story is T & { format_version: FormatVersion.HTML };
    export function isLegacyHtmlFormat(
        arg: FormatVersion | Pick<Story, 'format_version'>,
    ): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return isLegacyHtmlFormat(arg.format_version);
        }
        return arg === FormatVersion.HTML;
    }

    export function isSlateFormat(
        format: FormatVersion,
    ): format is
        | FormatVersion.SLATEJS_V3
        | FormatVersion.SLATEJS_V4
        | FormatVersion.SLATEJS_V5
        | FormatVersion.SLATEJS_V6;
    export function isSlateFormat<T extends Pick<Story, 'format_version'>>(
        story: Pick<Story, 'format_version'>,
    ): story is T & {
        format_version:
            | FormatVersion.SLATEJS_V3
            | FormatVersion.SLATEJS_V4
            | FormatVersion.SLATEJS_V5
            | FormatVersion.SLATEJS_V6;
    };
    export function isSlateFormat(arg: FormatVersion | Pick<Story, 'format_version'>): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return isSlateFormat(arg.format_version);
        }
        return (
            arg === FormatVersion.SLATEJS_V3 ||
            arg === FormatVersion.SLATEJS_V4 ||
            arg === FormatVersion.SLATEJS_V5 ||
            arg === FormatVersion.SLATEJS_V6
        );
    }

    export function isSlateV3Format(format: FormatVersion): format is FormatVersion.SLATEJS_V3;
    export function isSlateV3Format<T extends Pick<Story, 'format_version'>>(
        story: Pick<Story, 'format_version'>,
    ): story is T & { format_version: FormatVersion.SLATEJS_V3 };
    export function isSlateV3Format(arg: FormatVersion | Pick<Story, 'format_version'>): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return arg.format_version === FormatVersion.SLATEJS_V3;
        }
        return arg === FormatVersion.SLATEJS_V3;
    }

    export function isSlateV4Format(format: FormatVersion): format is FormatVersion.SLATEJS_V4;
    export function isSlateV4Format<T extends Pick<Story, 'format_version'>>(
        story: Pick<Story, 'format_version'>,
    ): story is T & { format_version: FormatVersion.SLATEJS_V4 };
    export function isSlateV4Format(arg: FormatVersion | Pick<Story, 'format_version'>): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return arg.format_version === FormatVersion.SLATEJS_V4;
        }
        return arg === FormatVersion.SLATEJS_V4;
    }

    export function isSlateV5Format(format: FormatVersion): format is FormatVersion.SLATEJS_V5;
    export function isSlateV5Format<T extends Pick<Story, 'format_version'>>(
        story: Pick<Story, 'format_version'>,
    ): story is T & { format_version: FormatVersion.SLATEJS_V5 };
    export function isSlateV5Format(arg: FormatVersion | Pick<Story, 'format_version'>): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return arg.format_version === FormatVersion.SLATEJS_V5;
        }
        return arg === FormatVersion.SLATEJS_V5;
    }

    export function isSlateV6Format(format: FormatVersion): format is FormatVersion.SLATEJS_V6;
    export function isSlateV6Format<T extends Pick<Story, 'format_version'>>(
        story: Pick<Story, 'format_version'>,
    ): story is T & { format_version: FormatVersion.SLATEJS_V6 };
    export function isSlateV6Format(arg: FormatVersion | Pick<Story, 'format_version'>): boolean {
        if (typeof arg === 'object' && arg !== null) {
            return arg.format_version === FormatVersion.SLATEJS_V6;
        }
        return arg === FormatVersion.SLATEJS_V6;
    }
}

export interface ExtendedStory
    extends Story,
        Pick<
            Story.ExtraFields,
            | 'thumbnail_image'
            | 'header_image'
            | 'preview_image'
            | 'social_image'
            | 'social_text'
            | 'tag_names'
            | 'content'
            | 'attached_gallery_content'
            | 'referenced_entities'
        > {}
