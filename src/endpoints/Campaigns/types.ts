import type {
    Campaign,
    Pagination,
    Query,
    SenderAddress,
    SortOrder,
    Story,
    Warning,
} from '../../types';

export interface CreateRequest {
    subject?: Campaign['subject'];
    sender?: SenderAddress['id'];
    content?: Campaign['content'];
    story?: Story['id'];
    story_alignment?: Campaign['story_alignment'];
    story_appearance?: Campaign['story_appearance'];
    recipients?: {
        query: Query;
    };
    is_open_tracking_enabled?: boolean;
    is_click_tracking_enabled?: boolean;
}

export interface UpdateRequest {
    subject?: Campaign['subject'];
    sender?: SenderAddress['id'];
    content?: Campaign['content'];
    story?: Story['id'];
    story_alignment?: Campaign['story_alignment'];
    story_appearance?: Campaign['story_appearance'];
    is_open_tracking_enabled?: boolean;
    is_click_tracking_enabled?: boolean;
}

export interface RecipientsOperationResponse {
    campaign: Campaign;
    warnings: Warning[];
    message: string;
    notifications: Notification[];
}

export interface CampaignResponse {
    campaign: Campaign;
    warnings: Warning[];
}

export interface ListOptions {
    limit?: number;
    offset?: number;
    sortOrder?: SortOrder | string;
}

export interface SearchOptions extends ListOptions {
    query?: Query;
}

export interface ListResponse {
    campaigns: Campaign[];
    pagination: Pagination;
    sort: string;
}
