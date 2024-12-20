import type { ProgressPromise } from '@prezly/progress-promise';

import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { CoverageEntry, SelectionValue } from '../../types';
import { Query, SortOrder } from '../../types';

import type {
    CreateOptions,
    CreateRequest,
    ListOptions,
    ListResponse,
    Scope,
    SearchOptions,
    UpdateRequest,
} from './types';

type CoverageId = CoverageEntry['uuid'] | CoverageEntry['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(options: ListOptions = {}, scope?: Scope): Promise<ListResponse> {
        const { includeDeleted, limit, offset, sortOrder } = options;
        // TODO: Switch to `scope` API parameter
        const url = scope?.story
            ? routing.storyCoverageUrl.replace(':story_id', String(scope.story))
            : routing.coverageUrl;
        return api.get<ListResponse>(url, {
            query: {
                include_deleted: includeDeleted ? 'on' : undefined,
                limit,
                offset,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async function search(options: SearchOptions = {}, scope?: Scope): Promise<ListResponse> {
        const { includeDeleted, query, limit, offset, sortOrder } = options;
        // TODO: Switch to `scope` API parameter
        const url = scope?.story
            ? routing.storyCoverageUrl.replace(':story_id', String(scope.story))
            : routing.coverageUrl;
        // TODO: Introduce dedicated Search POST API
        return api.get<ListResponse>(url, {
            query: {
                include_deleted: includeDeleted ? 'on' : undefined,
                query: Query.stringify(query),
                limit,
                offset,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async function get(id: CoverageId, includeDeleted = false): Promise<CoverageEntry> {
        const url = `${routing.coverageUrl}/${id}`;
        const { coverage } = await api.get<{ coverage: CoverageEntry }>(url, {
            query: {
                include_deleted: includeDeleted ? 'on' : undefined,
            },
        });
        return coverage;
    }

    async function getByExternalReferenceId(
        externalReferenceId: string,
    ): Promise<CoverageEntry | null> {
        const query = JSON.stringify({ external_reference_id: { $in: [externalReferenceId] } });
        const { coverage } = await search({
            includeDeleted: true,
            query,
            sortOrder: 'deleted_at', // Prefer non-deleted records first
        });
        return coverage[0] || null;
    }

    async function create(
        payload: CreateRequest,
        { enrich = false }: CreateOptions = {},
    ): Promise<CoverageEntry> {
        const { coverage } = await api.post<{ coverage: CoverageEntry }>(routing.coverageUrl, {
            payload,
            query: {
                enrich: enrich || undefined,
            },
        });
        return coverage;
    }

    async function update(id: CoverageId, payload: UpdateRequest): Promise<CoverageEntry> {
        const { coverage } = await api.patch<{ coverage: CoverageEntry }>(
            `${routing.coverageUrl}/${id}`,
            { payload },
        );
        return coverage;
    }

    async function doDelete(id: CoverageId): Promise<void> {
        return api.delete(`${routing.coverageUrl}/${id}`);
    }

    function bulkDelete(
        options: Partial<{
            selection: SelectionValue;
            query: string;
        }>,
    ): ProgressPromise<{ records_deleted_number: number }> {
        const { selection, query } = options;
        return api.delete(routing.coverageUrl, {
            payload: { selection, query },
        });
    }

    return {
        list,
        search,
        get,
        getByExternalReferenceId,
        create,
        update,
        delete: doDelete,
        bulkDelete,
    };
}
