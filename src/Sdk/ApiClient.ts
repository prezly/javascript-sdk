import { Api, ApiResponse, HeadersMap, Params, ParamsWithPayload } from '../Api';

import { DEFAULT_USER_AGENT } from './constants';

export interface Options {
    accessToken: string;
    baseUrl: string;
    headers: HeadersMap;
}

export default class ApiClient {
    public readonly baseUrl: string;
    private readonly headers: HeadersMap;

    constructor({ accessToken, baseUrl, headers }: Options) {
        this.baseUrl = baseUrl;
        this.headers = {
            'User-Agent': DEFAULT_USER_AGENT,
            'x-access-token': accessToken,
            ...headers,
        };
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
