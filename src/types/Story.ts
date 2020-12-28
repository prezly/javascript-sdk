import Category from './Category';
import Entity from './Entity';
import Culture from './Culture';
import RoomRef from './RoomRef';
import UserAccountRef from './UserAccountRef';

export enum LifecycleStatus {
    Uninitialized = 'uninitialized',
    Draft = 'draft',
    Scheduled = 'scheduled',
    Embargo = 'embargo',
    Published = 'published',
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
}

export interface StoryRef {
    id: number;
    title: string;
    culture: Culture;
    created_at: string;
    author: UserAccountRef | null;
    room: RoomRef;
    lifecycle_status: LifecycleStatus;
    links: {
        edit: string;
        newsroom_view: string;
        report: string;
    };
    visibility: Visibility;
}


export default interface Story extends Entity<number> {
    title: string;
    subtitle: string;
    intro: string;
    format_version: number;
    culture: Culture;
    author: UserAccountRef | null;

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

    room: RoomRef;
    categories: Category[];
    translations: StoryRef[];

    thumbnail_url: string;
    created_at: string;
    updated_at: string;
    published_at: string | null;
    scheduled_at: string | null;

    lifecycle_status: LifecycleStatus;
    is_archived: boolean;
    is_finalized: boolean;
    is_published: boolean;
    is_draft: boolean;
    is_embargo: boolean;
    is_private: boolean;
    is_scheduled: boolean;
    is_sharable: boolean;
    is_analytics_available: boolean;

    publication_status: PublicationStatus;
    visibility: Visibility;
}
