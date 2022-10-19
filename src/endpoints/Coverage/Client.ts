import type { ProgressPromise } from '@prezly/progress-promise';

import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { CoverageEntry, SelectionValue } from '../../types';
import { Query } from '../../types';


import type {
    CreateRequest,
    ListOptions,
    ListResponse,
    Scope,
    SearchOptions,
    UpdateRequest,
} from './types';

type CoverageId = CoverageEntry['uuid'] | CoverageEntry['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list(options: ListOptions = {}, scope?: Scope): Promise<ListResponse> {
        const { includeDeleted, limit, offset, sortOrder } = options;
        // TODO: Switch to `scope` API parameter
        const url = scope?.story
            ? routing.storyCoverageUrl.replace(':story_id', String(scope.story))
            : routing.coverageUrl;
        return this.apiClient.get<ListResponse>(url, {
            query: {
                include_deleted: includeDeleted ? 'on' : undefined,
                limit,
                offset,
                sort: sortOrder,
            },
        });
    }

    async search(options: SearchOptions = {}, scope?: Scope): Promise<ListResponse> {
        const { includeDeleted, query, limit, offset, sortOrder } = options;
        // TODO: Switch to `scope` API parameter
        const url = scope?.story
            ? routing.storyCoverageUrl.replace(':story_id', String(scope.story))
            : routing.coverageUrl;
        // TODO: Introduce dedicated Search POST API
        return this.apiClient.get<ListResponse>(url, {
            query: {
                include_deleted: includeDeleted ? 'on' : undefined,
                query: Query.stringify(query),
                limit,
                offset,
                sort: sortOrder,
            },
        });
    }

    async get(id: CoverageId, includeDeleted = false): Promise<CoverageEntry> {
        const url = `${routing.coverageUrl}/${id}`;
        const { coverage } = await this.apiClient.get<{ coverage: CoverageEntry }>(url, {
            query: {
                include_deleted: includeDeleted ? 'on' : undefined,
            },
        });
        return coverage;
    }

    async getByExternalReferenceId(externalReferenceId: string): Promise<CoverageEntry | null> {
        const query = JSON.stringify({ external_reference_id: { $in: [externalReferenceId] } });
        const { coverage } = await this.search({
            includeDeleted: true,
            query,
        });
        return coverage[0] || null;
    }

    async create(payload: CreateRequest): Promise<CoverageEntry> {
        const { coverage } = await this.apiClient.post<{ coverage: CoverageEntry }>(
            routing.coverageUrl,
            {
                payload,
            },
        );
        return coverage;
    }

    async update(id: CoverageId, payload: UpdateRequest): Promise<CoverageEntry> {
        const { coverage } = await this.apiClient.patch<{ coverage: CoverageEntry }>(
            `${routing.coverageUrl}/${id}`,
            { payload },
        );
        return coverage;
    }

    async remove(id: CoverageId): Promise<void> {
        return this.apiClient.delete(`${routing.coverageUrl}/${id}`);
    }

    async bulkRemove(
        options: Partial<{
            selection: SelectionValue;
            query: string;
        }>,
    ): ProgressPromise<{ records_deleted_number: number }> {
        const { selection, query } = options;
        return this.apiClient.delete(routing.coverageUrl, {
            payload: { selection, query },
        });
    }
}
