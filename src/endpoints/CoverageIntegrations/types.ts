import {
    CoverageEntry,
    type CoverageIntegrationRun,
    type Newsroom,
    type Pagination,
    type SortOrder,
} from '../../types';

import Provider = CoverageEntry.Provider;

export interface CreateRequest {
    newsroom?: Newsroom['id'] | Newsroom['uuid'] | null;
    provider: Provider;
    input: string;
    name: string;
    description?: string;
    skip_author?: boolean;
    skip_organisation?: boolean;
}

export interface UpdateRequest {
    newsroom?: Newsroom['id'] | Newsroom['uuid'] | null;
    input?: string;
    name?: string;
    description?: string;
    skip_author?: boolean;
    skip_organisation?: boolean;
}

export interface ListRunsOptions {
    limit?: number;
    offset?: number;
    sortOrder?: SortOrder | string;
}

export interface ListRunsResponse {
    runs: CoverageIntegrationRun[];
    pagination: Pagination;
    sort: string;
}

export interface PreviewEntry {
    image: string | null;
    link: string | null;
    title: string;
    username: string | null;
}

export interface PreviewResponse {
    total: number;
    entries: PreviewEntry[];
}
