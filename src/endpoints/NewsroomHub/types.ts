import type { Newsroom } from '../../types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export interface HubMember {
    newsroom: Newsroom;
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
