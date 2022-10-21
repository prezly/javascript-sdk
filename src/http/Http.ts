import { createRequest } from './createRequest';
import type { ApiResponse, Params, ParamsWithPayload } from './types';
import { Method } from './types';

export const Http = {
    get<V = any>(url: string, { headers, query }: Params = {}): Promise<ApiResponse<V>> {
        return createRequest(url, {
            headers,
            method: Method.GET,
            query,
        });
    },

    post<V = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return createRequest(url, {
            headers,
            method: Method.POST,
            payload,
            query,
        });
    },

    put<V = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return createRequest(url, {
            headers,
            method: Method.PUT,
            payload,
            query,
        });
    },

    patch<V = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return createRequest(url, {
            headers,
            method: Method.PATCH,
            payload,
            query,
        });
    },

    delete<V = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return createRequest(url, {
            headers,
            method: Method.DELETE,
            payload,
            query,
        });
    },
};
