import type { ContactsExport, ContactsScope, Pagination, Query } from '../../types';

export interface ListOptions {
    limit?: number;
    offset?: number;
    sortOrder?: string;
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
