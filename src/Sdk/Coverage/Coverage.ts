import { Coverage } from '../../types';

import { coverageUrl } from '../routing';
import ApiClient from '../ApiClient';
import { buildUrl, buildUrlWithId } from '../utils';

import {
    CoverageCreateRequest,
    CoverageListResponse,
    CoverageSearchOptions,
    CoverageUpdateRequest,
} from './types';

export default class CoverageSdk {
    private readonly apiClient: ApiClient;
    private readonly sdkUrl = coverageUrl;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    async list(options: CoverageSearchOptions = {}): Promise<CoverageListResponse> {
        const { jsonQuery, page, pageSize, sortOrder } = options;
        const response = await this.apiClient.get<CoverageListResponse>(
            buildUrl(this.apiClient.baseUrl, this.sdkUrl),
            {
                query: {
                    page,
                    pageSize,
                    query: jsonQuery,
                    sort: sortOrder,
                },
            },
        );
        return response.payload;
    }

    async get(itemOrItemId: string | Coverage): Promise<Coverage> {
        const response = await this.apiClient.get<{ coverage: Coverage }>(
            buildUrlWithId(this.apiClient.baseUrl, this.sdkUrl, itemOrItemId),
        );
        return response.payload.coverage;
    }

    async getByExternalReferenceId(externalReferenceId: string): Promise<Coverage | null> {
        const jsonQuery = JSON.stringify({ external_reference_id: { $in: [externalReferenceId] } });
        const { coverage } = await this.list({ jsonQuery });
        return coverage[0] || null;
    }

    async create(payload: CoverageCreateRequest): Promise<Coverage> {
        const response = await this.apiClient.post<{ coverage: Coverage }>(
            buildUrl(this.apiClient.baseUrl, this.sdkUrl),
            { payload },
        );
        return response.payload.coverage;
    }

    async update(
        itemOrItemId: string | Coverage,
        payload: CoverageUpdateRequest,
    ): Promise<Coverage> {
        const response = await this.apiClient.patch<{ coverage: Coverage }>(
            buildUrlWithId(this.apiClient.baseUrl, this.sdkUrl, itemOrItemId),
            { payload },
        );
        return response.payload.coverage;
    }

    async remove(itemOrItemId: string | Coverage): Promise<void> {
        await this.apiClient.delete(
            buildUrlWithId(this.apiClient.baseUrl, this.sdkUrl, itemOrItemId),
        );
    }
}
