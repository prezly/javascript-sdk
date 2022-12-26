import type { NewsroomRef } from '../../types';

type NewsroomId = NewsroomRef['uuid'] | NewsroomRef['id'];

export interface HubMember {
    newsroom: NewsroomRef;
    is_displaying_stories_in_hub: boolean;
}

export interface ListResponse {
    members: HubMember[];
}

export interface LinkManyRequest {
    members: NewsroomId[];
}

export interface LinkOptions {
    is_displaying_stories_in_hub?: boolean;
}
