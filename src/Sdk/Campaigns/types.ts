import { Campaign, Pagination, Query, SenderAddress, Story, Warning } from '../../types';

export interface CampaignCreateRequest {
    subject?: Campaign['subject'];
    sender?: SenderAddress['id'];
    content?: Campaign['content'];
    story?: Story['id'];
    story_alignment?: Campaign['story_alignment'];
    story_appearance?: Campaign['story_appearance'];
    recipients?: {
        query: Query;
    };
}

export interface CampaignUpdateRequest {
    subject?: Campaign['subject'];
    sender?: SenderAddress['id'];
    content?: Campaign['content'];
    story?: Story['id'];
    story_alignment?: Campaign['story_alignment'];
    story_appearance?: Campaign['story_appearance'];
}

export interface CampaignRecipientsOperationResponse {
    campaign: Campaign;
    warnings: Warning[];
    message: string;
    notifications: Notification[];
}

export interface CampaignResponse {
    campaign: Campaign;
    warnings: Warning[];
}

export interface CampaignsSearchOptions {
    jsonQuery?: Query;
    page?: number;
    pageSize?: number;
    sortOrder?: string;
}

export interface CampaignsListResponse {
    campaigns: Campaign[];
    pagination: Pagination;
    sort: string;
}
