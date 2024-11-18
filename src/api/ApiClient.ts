import type { ApiResponse, HeadersMap, HttpClient, Params, ParamsWithPayload } from '../http';

import { DEFAULT_USER_AGENT } from './constants';

export interface Options {
    accessToken: string;
    headers: HeadersMap;
}

export type ApiClient = ReturnType<typeof createApiClient>;

export function createApiClient(http: HttpClient, { accessToken, headers }: Options) {
    const defaultHeaders = {
        authorization: `Bearer ${accessToken}`,
        'User-Agent': DEFAULT_USER_AGENT,
        ...headers,
    };

    function get<V = any>(url: string, { headers, query }: Params = {}): Promise<ApiResponse<V>> {
        return http.get<V>(url, {
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            query,
        });
    }

    function post<V = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return http.post<V>(url, {
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            payload,
            query,
        });
    }

    function put<V = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return http.put<V>(url, {
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            payload,
            query,
        });
    }

    function patch<V = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return http.patch<V>(url, {
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            payload,
            query,
        });
    }

    function doDelete<V = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return http.delete<V>(url, {
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            payload,
            query,
        });
    }

    return {
        get,
        post,
        put,
        patch,
        delete: doDelete,
    };
}
