import type { Entity } from './Entity';

export interface NewsroomWebhook extends Entity<string> {
    id: string;
    name: string;
    url: string;
    events: NewsroomWebhook.Event[];
    secret: string | null;
    is_active: boolean;
}

export namespace NewsroomWebhook {
    export enum Event {
        STORY_CREATED = 'story.created',
        STORY_UPDATED = 'story.updated',
        STORY_DELETED = 'story.deleted',
        CATEGORY_CREATED = 'category.created',
        CATEGORY_UPDATED = 'category.updated',
        CATEGORY_DELETED = 'category.deleted',
    }
}
