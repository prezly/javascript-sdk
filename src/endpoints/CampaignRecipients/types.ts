import { EmailRecipient, Pagination, Query } from '../../types';

export interface CampaignsRecipientsSearchOptions {
    jsonQuery?: Query;
    page?: number;
    pageSize?: number;
    sortOrder?: string;
}

export interface CampaignsRecipientsListResponse {
    recipients: EmailRecipient[];
    pagination: Pagination;
    sort: string;
}
