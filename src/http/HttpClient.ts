import type { Fetch } from '../api';

import type { ApiError } from './ApiError';
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

interface Options {
    baseUrl?: string;
    fetch?: Fetch;
    onError?: (error: ApiError) => void;
}

export function createHttpClient(options: Options = {}): HttpClient {
    const baseUrl = options.baseUrl ?? null;
    const fetchImpl = options.fetch ?? fetch;
    const onError = options.onError;

    function resolveUrl(url: string) {
        if (baseUrl) {
            return new URL(url, baseUrl).toString();
        }
        return url;
    }

    return {
        get(url, { headers, query } = {}) {
            return createRequest(
                fetchImpl,
                resolveUrl(url),
                {
                    headers,
                    method: Method.GET,
                    query,
                },
                onError,
            );
        },

        post(url: string, { headers, payload, query } = {}) {
            return createRequest(
                fetchImpl,
                resolveUrl(url),
                {
                    headers,
                    method: Method.POST,
                    payload,
                    query,
                },
                onError,
            );
        },

        put(url, { headers, payload, query } = {}) {
            return createRequest(
                fetchImpl,
                resolveUrl(url),
                {
                    headers,
                    method: Method.PUT,
                    payload,
                    query,
                },
                onError,
            );
        },

        patch(url: string, { headers, payload, query } = {}) {
            return createRequest(
                fetchImpl,
                resolveUrl(url),
                {
                    headers,
                    method: Method.PATCH,
                    payload,
                    query,
                },
                onError,
            );
        },

        delete(url: string, { headers, payload, query } = {}) {
            return createRequest(
                fetchImpl,
                resolveUrl(url),
                {
                    headers,
                    method: Method.DELETE,
                    payload,
                    query,
                },
                onError,
            );
        },
    };
}
