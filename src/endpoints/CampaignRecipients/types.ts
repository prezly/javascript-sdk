import type { EmailRecipient, Pagination, Query, SortOrder } from '../../types';

export interface ListOptions {
    limit?: number;
    offset?: number;
    sortOrder?: SortOrder | string;
}
export interface SearchOptions extends ListOptions {
    query?: Query;
}

export interface ListResponse {
    recipients: EmailRecipient[];
    pagination: Pagination;
    sort: string;
}
