import { ProgressPromise } from '@prezly/progress-promise';

import { Coverage, SelectionValue } from '../../types';

import routing from '../routing';
import { DeferredJobsApiClient } from '../DeferredJobsApiClient';

import {
    CoverageCreateRequest,
    CoverageListResponse,
    CoverageScope,
    CoverageSearchOptions,
    CoverageUpdateRequest,
} from './types';

type CoverageId = Coverage['uuid'] | Coverage['id'];

export default class CoverageSdk {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list(
        options: CoverageSearchOptions = {},
        scope?: CoverageScope,
    ): Promise<CoverageListResponse> {
        const { includeDeleted, jsonQuery, page, pageSize, sortOrder } = options;
        const url = scope?.story
            ? routing.storyCoverageUrl.replace(':story_id', String(scope.story))
            : routing.coverageUrl;
        return this.apiClient.get<CoverageListResponse>(url, {
            query: {
                include_deleted: includeDeleted ? 'on' : undefined,
                page,
                limit: pageSize,
                query: jsonQuery,
                sort: sortOrder,
            },
        });
    }

    async get(id: CoverageId, includeDeleted = false): Promise<Coverage> {
        const url = `${routing.coverageUrl}/${id}`;
        const { coverage } = await this.apiClient.get<{ coverage: Coverage }>(url, {
            query: {
                include_deleted: includeDeleted ? 'on' : undefined,
            },
        });
        return coverage;
    }

    async getByExternalReferenceId(externalReferenceId: string): Promise<Coverage | null> {
        const jsonQuery = JSON.stringify({ external_reference_id: { $in: [externalReferenceId] } });
        const { coverage } = await this.list({
            includeDeleted: true,
            jsonQuery,
        });
        return coverage[0] || null;
    }

    async create(payload: CoverageCreateRequest): Promise<Coverage> {
        const { coverage } = await this.apiClient.post<{ coverage: Coverage }>(
            routing.coverageUrl,
            {
                payload,
            },
        );
        return coverage;
    }

    async update(id: CoverageId, payload: CoverageUpdateRequest): Promise<Coverage> {
        const { coverage } = await this.apiClient.patch<{ coverage: Coverage }>(
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
            jsonQuery: string;
        }>,
    ): ProgressPromise<{ records_deleted_number: number }> {
        const { selection, jsonQuery } = options;
        return this.apiClient.delete(routing.coverageUrl, {
            payload: {
                selection,
                query: jsonQuery,
            },
        });
    }
}
