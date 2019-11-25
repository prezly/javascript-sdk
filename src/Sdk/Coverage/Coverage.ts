import { Coverage } from '../../types';

import routing from '../routing';
import ApiClient from '../ApiClient';
import { buildUriWithId } from '../utils';

import {
    CoverageCreateRequest,
    CoverageListResponse,
    CoverageSearchOptions,
    CoverageUpdateRequest,
} from './types';

export default class CoverageSdk {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    async list(options: CoverageSearchOptions = {}): Promise<CoverageListResponse> {
        const { jsonQuery, page, pageSize, sortOrder } = options;
        const response = await this.apiClient.get<CoverageListResponse>(routing.coverageUrl, {
            query: {
                page,
                pageSize,
                query: jsonQuery,
                sort: sortOrder,
            },
        });
        return response.payload;
    }

    async get(itemOrItemId: string | Coverage): Promise<Coverage> {
        const response = await this.apiClient.get<{ coverage: Coverage }>(
            buildUriWithId(routing.coverageUrl, itemOrItemId),
        );
        return response.payload.coverage;
    }

    async getByExternalReferenceId(externalReferenceId: string): Promise<Coverage | null> {
        const jsonQuery = JSON.stringify({ external_reference_id: { $in: [externalReferenceId] } });
        const { coverage } = await this.list({ jsonQuery });
        return coverage[0] || null;
    }

    async create(payload: CoverageCreateRequest): Promise<Coverage> {
        const response = await this.apiClient.post<{ coverage: Coverage }>(routing.coverageUrl, {
            payload,
        });
        return response.payload.coverage;
    }

    async update(
        itemOrItemId: string | Coverage,
        payload: CoverageUpdateRequest,
    ): Promise<Coverage> {
        const response = await this.apiClient.patch<{ coverage: Coverage }>(
            buildUriWithId(routing.coverageUrl, itemOrItemId),
            { payload },
        );
        return response.payload.coverage;
    }

    async remove(itemOrItemId: string | Coverage): Promise<void> {
        await this.apiClient.delete(buildUriWithId(routing.coverageUrl, itemOrItemId));
    }
}
