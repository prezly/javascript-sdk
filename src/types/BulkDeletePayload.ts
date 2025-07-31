import type { Query } from './common';

export interface BulkDeletePayload {
    search?: string;
    query?: Query;
}
