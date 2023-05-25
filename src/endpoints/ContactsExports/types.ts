import type { ContactsExport, Pagination, Query, SortOrder } from '../../types';

// Convenience shortcuts
export type { ContactsBulkSelector, ContactsScope } from '../../types';

export interface ListOptions {
    limit?: number;
    offset?: number;
    sortOrder?: SortOrder | string;
}

export interface SearchOptions extends ListOptions {
    query?: Query;
}

export interface ListResponse {
    exports: ContactsExport[];
    pagination: Pagination;
    sort: string;
}
