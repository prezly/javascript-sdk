import type { Category } from './Category';
import type { OEmbedInfo } from './common';
import type { CultureRef } from './Culture';
import type { NewsroomRef } from './Newsroom';
import type { UserRef } from './User';

export interface StoryRef {
    uuid: string;
    /**
     * @deprecated Please use `uuid` as an identifier instead.
     * @see uuid
     */
    id: number;
    title: string;
    slug: string;
    publication_status: Story.PublicationStatus;
    lifecycle_status: Story.LifecycleStatus;
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
        edit: string;
        newsroom_view: string;
        report: string;
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
    slug: string;
    format_version: Story.FormatVersion;
    culture: CultureRef;
    author: UserRef | null;

    links: {
        // backend app urls
        analytics: string;
        api: string;
        create_campaign: string;
        duplicate: string | null;
        edit: string | null;
        newsroom_preview: string;
        newsroom_view: string | null;
        preview: string;
        publication_api: string;
        reports_api: string;
        // newsroom urls
        sharing: string;
        short: string | null;
        translate: string | null;
    };

    newsroom: NewsroomRef;
    categories: Category[];
    translations: StoryRef[];
    oembed: OEmbedInfo;

    coverage_number: number;
    language: string;
    last_coverage_at: string | null;

    thumbnail_url: string;
    created_at: string;
    updated_at: string;
    published_at: string | null;
    scheduled_at: string | null;

    lifecycle_status: Story.LifecycleStatus;
    is_archived: boolean;
    is_finalized: boolean;
    is_published: boolean;
    is_draft: boolean;
    is_embargo: boolean;
    is_private: boolean;
    is_scheduled: boolean;
    is_sharable: boolean;
    is_analytics_available: boolean;

    publication_status: Story.PublicationStatus;
    visibility: Story.Visibility;

    /**
     * Contains attached gallery slate content.
     * Always `null` for v3 stories.
     */
    attached_gallery_content: string | null;
}

export namespace Story {
    export enum FormatVersion {
        HTML = 1,
        SLATEJS = 3,
    }

    export enum LifecycleStatus {
        UNINITIALIZED = 'uninitialized',
        DRAFT = 'draft',
        SCHEDULED = 'scheduled',
        EMBARGO = 'embargo',
        PUBLISHED = 'published',
    }

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
         * Depending on `format_version` this field can contain:
         * - HTML content for v1 stories (deprecated)
         * - JSON-encoded structured content for v3 stories (see Prezly Content Format).
         */
        content: string;
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

        referenced_entities: {
            stories: Record<string, OEmbedInfo>;
        };
    }

    export function isUninitialized(status: LifecycleStatus): boolean;
    export function isUninitialized(story: Pick<Story, 'lifecycle_status'>): boolean;
    export function isUninitialized(
        arg: LifecycleStatus | Pick<Story, 'lifecycle_status'>,
    ): boolean {
        if (typeof arg === 'object') {
            return isUninitialized(arg.lifecycle_status);
        }
        return arg === LifecycleStatus.UNINITIALIZED;
    }

    export function isDraft(status: LifecycleStatus): boolean;
    export function isDraft(story: Pick<Story, 'lifecycle_status'>): boolean;
    export function isDraft(arg: LifecycleStatus | Pick<Story, 'lifecycle_status'>): boolean {
        if (typeof arg === 'object') {
            return isDraft(arg.lifecycle_status);
        }
        return arg === LifecycleStatus.DRAFT;
    }

    export function isScheduled(status: LifecycleStatus): boolean;
    export function isScheduled(story: Pick<Story, 'lifecycle_status'>): boolean;
    export function isScheduled(arg: LifecycleStatus | Pick<Story, 'lifecycle_status'>): boolean {
        if (typeof arg === 'object') {
            return isScheduled(arg.lifecycle_status);
        }
        return arg === LifecycleStatus.SCHEDULED;
    }

    export function isScheduledEmbargo(status: LifecycleStatus): boolean;
    export function isScheduledEmbargo(story: Pick<Story, 'lifecycle_status'>): boolean;
    export function isScheduledEmbargo(
        arg: LifecycleStatus | Pick<Story, 'lifecycle_status'>,
    ): boolean {
        if (typeof arg === 'object') {
            return isScheduledEmbargo(arg.lifecycle_status);
        }
        return arg === LifecycleStatus.EMBARGO;
    }

    export function isPublished(status: LifecycleStatus): boolean;
    export function isPublished(story: Pick<Story, 'lifecycle_status'>): boolean;
    export function isPublished(arg: LifecycleStatus | Pick<Story, 'lifecycle_status'>): boolean {
        if (typeof arg === 'object') {
            return isPublished(arg.lifecycle_status);
        }
        return arg === LifecycleStatus.PUBLISHED;
    }
}

export interface ExtendedStory extends Story, Story.ExtraFields {}
