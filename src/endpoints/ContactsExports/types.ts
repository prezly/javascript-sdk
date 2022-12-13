import type { ContactsExport, ContactsScope, Pagination, Query, SortOrder } from '../../types';

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

export interface ContactsBulkSelector {
    scope?: ContactsScope;
    query?: Query;
}
