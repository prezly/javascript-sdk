import { Coverage, Pagination } from '../../types';

export interface CoverageListResponse {
    coverage: Coverage[];
    sort: string;
    pagination: Pagination;
}
