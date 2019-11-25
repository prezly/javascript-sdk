import { Api, ApiResponse, HeadersMap, Params, ParamsWithPayload } from '../Api';
import { Entity } from '../types';

import { DEFAULT_USER_AGENT } from './constants';

export interface Options {
    accessToken: string;
    baseUrl: string;
    headers: HeadersMap;
}

/**
 * Remove heading and trailing slashes.
 * Examples:
 *  - https://example.com/ -> https://example.com
 *  - /v2/path -> v2/path
 *  - /v2/path/ -> v2/path
 */
const stripSlashes = (url: string): string => url.replace(/^\/|\/$/g, '');

export default class ApiClient {
    private readonly baseUrl: string;
    private readonly headers: HeadersMap;

    constructor({ accessToken, baseUrl, headers }: Options) {
        this.baseUrl = baseUrl;
        this.headers = {
            'User-Agent': DEFAULT_USER_AGENT,
            'x-access-token': accessToken,
            ...headers,
        };
    }

    public buildUrl(sdkUrl: string): string {
        return `${stripSlashes(this.baseUrl)}/${stripSlashes(sdkUrl)}`;
    }

    public buildUrlWithId(sdkUrl: string, itemOrItemId: string | Entity<number | string>): string {
        const itemId = typeof itemOrItemId === 'object' ? itemOrItemId.id : itemOrItemId;
        return `${this.buildUrl(sdkUrl)}/${itemId}`;
    }

    public get<P = any>(url: string, { headers, query }: Params = {}): Promise<ApiResponse<P>> {
        return Api.get<P>(url, {
            headers: {
                ...this.headers,
                ...headers,
            },
            query,
        });
    }

    public post<P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> {
        return Api.post<P>(url, {
            headers: {
                ...this.headers,
                ...headers,
            },
            payload,
            query,
        });
    }

    public put<P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> {
        return Api.put<P>(url, {
            headers: {
                ...this.headers,
                ...headers,
            },
            payload,
            query,
        });
    }

    public patch<P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> {
        return Api.patch<P>(url, {
            headers: {
                ...this.headers,
                ...headers,
            },
            payload,
            query,
        });
    }

    public delete<P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> {
        return Api.delete<P>(url, {
            headers: {
                ...this.headers,
                ...headers,
            },
            payload,
            query,
        });
    }
}
