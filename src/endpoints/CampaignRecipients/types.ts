import { EmailRecipient, Pagination, Query } from '../../types';

export interface ListOptions {
    page?: number;
    pageSize?: number;
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
