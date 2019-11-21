import { Api } from '../../Api';
import { Coverage } from '../../types';

import { coverageUrl } from '../routing';
import BaseSdk, { Options } from '../BaseSdk';

import {
    CoverageCreateRequest,
    CoverageListResponse,
    CoverageSearchOptions,
    CoverageUpdateRequest,
} from './types';

export default class CoverageSdk extends BaseSdk<Coverage> {
    constructor(options: Options) {
        super(options, coverageUrl);
    }

    async list(options: CoverageSearchOptions = {}): Promise<CoverageListResponse> {
        const { jsonQuery, page, pageSize, sortOrder } = options;
        const response = await Api.get<CoverageListResponse>(this.url, {
            headers: this.getHeaders(),
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
        const response = await Api.get<{ coverage: Coverage }>(this.getUrlWithId(itemOrItemId), {
            headers: this.getHeaders(),
        });
        return response.payload.coverage;
    }

    async getByExternalReferenceId(externalReferenceId: string): Promise<Coverage | null> {
        const jsonQuery = JSON.stringify({ external_reference_id: { $in: [externalReferenceId] } });
        const { coverage } = await this.list({ jsonQuery });
        return coverage[0] || null;
    }

    async create(payload: CoverageCreateRequest): Promise<Coverage> {
        const response = await Api.post<{ coverage: Coverage }>(this.url, {
            headers: this.getHeaders(),
            payload,
        });
        return response.payload.coverage;
    }

    async update(
        itemOrItemId: string | Coverage,
        payload: CoverageUpdateRequest,
    ): Promise<Coverage> {
        const response = await Api.patch<{ coverage: Coverage }>(this.getUrlWithId(itemOrItemId), {
            headers: this.getHeaders(),
            payload,
        });
        return response.payload.coverage;
    }

    async remove(itemOrItemId: string | Coverage): Promise<void> {
        await Api.delete<{ coverage: Coverage }>(this.getUrlWithId(itemOrItemId), {
            headers: this.getHeaders(),
        });
    }
}
