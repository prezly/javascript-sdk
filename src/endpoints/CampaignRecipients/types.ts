import type { EmailRecipient, Pagination, Query } from '../../types';

export interface ListOptions {
    limit?: number;
    offset?: number;
    sortOrder?: string;
}
export interface SearchOptions extends ListOptions {
    query?: Query;
}

export interface ListResponse {
    recipients: EmailRecipient[];
    pagination: Pagination;
    sort: string;
}
