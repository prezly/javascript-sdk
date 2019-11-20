import { Coverage, Pagination } from '../../types';

export interface Options {
    token: string;
    baseUrl?: string;
}

export interface CoverageListResponse {
    coverage: Coverage[];
    sort: string;
    pagination: Pagination;
}
