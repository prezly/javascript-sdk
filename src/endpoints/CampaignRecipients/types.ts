import { EmailRecipient, Pagination, Query } from '../../types';

export interface SearchOptions {
    jsonQuery?: Query;
    page?: number;
    pageSize?: number;
    sortOrder?: string;
}

export interface ListResponse {
    recipients: EmailRecipient[];
    pagination: Pagination;
    sort: string;
}
