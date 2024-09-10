import type { CoverageIntegrationRun, Pagination, SortOrder } from '../../types';

export interface ListOptions {
    limit?: number;
    offset?: number;
    sortOrder?: SortOrder | string;
}

export interface ListResponse {
    runs: CoverageIntegrationRun[];
    pagination: Pagination;
    sort: string;
}
