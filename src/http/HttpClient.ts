import type { Fetch } from '../api';

import { createRequest } from './createRequest';
import type { ApiResponse, Params, ParamsWithPayload } from './types';
import { Method } from './types';

export interface HttpClient {
    get<V = any>(url: string, params?: Params): Promise<ApiResponse<V>>;
    post<V = any>(url: string, params?: ParamsWithPayload): Promise<ApiResponse<V>>;
    put<V = any>(url: string, params?: ParamsWithPayload): Promise<ApiResponse<V>>;
    patch<V = any>(url: string, params?: ParamsWithPayload): Promise<ApiResponse<V>>;
    delete<V = any>(url: string, params?: ParamsWithPayload): Promise<ApiResponse<V>>;
}

export function createHttpClient(options: { baseUrl?: string; fetch?: Fetch } = {}): HttpClient {
    const baseUrl = options.baseUrl ?? null;
    const fetchImpl = options.fetch ?? fetch;

    function resolveUrl(url: string) {
        if (baseUrl) {
            return new URL(url, baseUrl).toString();
        }
        return url;
    }

    return {
        get(url, { headers, query } = {}) {
            return createRequest(fetchImpl, resolveUrl(url), {
                headers,
                method: Method.GET,
                query,
            });
        },

        post(url: string, { headers, payload, query } = {}) {
            return createRequest(fetchImpl, resolveUrl(url), {
                headers,
                method: Method.POST,
                payload,
                query,
            });
        },

        put(url, { headers, payload, query } = {}) {
            return createRequest(fetchImpl, resolveUrl(url), {
                headers,
                method: Method.PUT,
                payload,
                query,
            });
        },

        patch(url: string, { headers, payload, query } = {}) {
            return createRequest(fetchImpl, resolveUrl(url), {
                headers,
                method: Method.PATCH,
                payload,
                query,
            });
        },

        delete(url: string, { headers, payload, query } = {}) {
            return createRequest(fetchImpl, resolveUrl(url), {
                headers,
                method: Method.DELETE,
                payload,
                query,
            });
        },
    };
}
