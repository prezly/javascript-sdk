import type { ApiResponse, HeadersMap, HttpClient, Params, ParamsWithPayload } from '../http';
import { stripSlashes } from '../utils';

import { DEFAULT_USER_AGENT } from './constants';

export interface Options {
    accessToken: string;
    baseUrl: string;
    headers: HeadersMap;
}

export class ApiClient {
    private readonly http: HttpClient;
    private readonly baseUrl: string;
    private readonly headers: HeadersMap;

    constructor(http: HttpClient, { accessToken, baseUrl, headers }: Options) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.headers = {
            authorization: `Bearer ${accessToken}`,
            'User-Agent': DEFAULT_USER_AGENT,
            ...headers,
        };
    }

    public get<V = any>(
        endpointUri: string,
        { headers, query }: Params = {},
    ): Promise<ApiResponse<V>> {
        return this.http.get<V>(this.buildEndpointUrl(endpointUri), {
            headers: {
                ...this.headers,
                ...headers,
            },
            query,
        });
    }

    public post<V = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return this.http.post<V>(this.buildEndpointUrl(endpointUri), {
            headers: {
                ...this.headers,
                ...headers,
            },
            payload,
            query,
        });
    }

    public put<V = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return this.http.put<V>(this.buildEndpointUrl(endpointUri), {
            headers: {
                ...this.headers,
                ...headers,
            },
            payload,
            query,
        });
    }

    public patch<V = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return this.http.patch<V>(this.buildEndpointUrl(endpointUri), {
            headers: {
                ...this.headers,
                ...headers,
            },
            payload,
            query,
        });
    }

    public delete<V = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<V>> {
        return this.http.delete<V>(this.buildEndpointUrl(endpointUri), {
            headers: {
                ...this.headers,
                ...headers,
            },
            payload,
            query,
        });
    }

    private buildEndpointUrl(endpointUri: string): string {
        return `${stripSlashes(this.baseUrl)}/${stripSlashes(endpointUri)}`;
    }
}
