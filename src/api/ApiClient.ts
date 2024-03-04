import type { ApiResponse, HeadersMap, HttpClient, Params, ParamsWithPayload } from '../http';
import { stripSlashes } from '../utils';

import { DEFAULT_USER_AGENT } from './constants';

export interface Options {
    accessToken: string;
    baseUrl: string;
    headers: HeadersMap;
}

export type ApiClient = ReturnType<typeof createApiClient>;

export function createApiClient(http: HttpClient, { accessToken, baseUrl, headers }: Options) {
    const defaultHeaders = {
        authorization: `Bearer ${accessToken}`,
        'User-Agent': DEFAULT_USER_AGENT,
        ...headers,
    };

    function buildEndpointUrl(endpointUri: string): string {
        return `${stripSlashes(baseUrl)}/${stripSlashes(endpointUri)}`;
    }

    function get<V = any>(
        endpointUri: string,
        { headers, query }: Params = {},
    ): Promise<ApiResponse<V>> {
        return http.get<V>(buildEndpointUrl(endpointUri), {
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            query,
        });
    }

    function post<V = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return http.post<V>(buildEndpointUrl(endpointUri), {
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            payload,
            query,
        });
    }

    function put<V = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return http.put<V>(buildEndpointUrl(endpointUri), {
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            payload,
            query,
        });
    }

    function patch<V = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return http.patch<V>(buildEndpointUrl(endpointUri), {
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            payload,
            query,
        });
    }

    function doDelete<V = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return http.delete<V>(buildEndpointUrl(endpointUri), {
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
