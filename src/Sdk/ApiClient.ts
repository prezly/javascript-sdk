import { Http, ApiResponse, HeadersMap, Params, ParamsWithPayload } from '../http';

import { DEFAULT_USER_AGENT } from './constants';
import { stripSlashes } from './utils';

export interface Options {
    accessToken: string;
    baseUrl: string;
    headers: HeadersMap;
}

export class ApiClient {
    private readonly baseUrl: string;
    private readonly headers: HeadersMap;

    constructor({ accessToken, baseUrl, headers }: Options) {
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
        return Http.get<V>(this.buildEndpointUrl(endpointUri), {
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
        return Http.post<V>(this.buildEndpointUrl(endpointUri), {
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
        return Http.put<V>(this.buildEndpointUrl(endpointUri), {
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
        return Http.patch<V>(this.buildEndpointUrl(endpointUri), {
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
        return Http.delete<V>(this.buildEndpointUrl(endpointUri), {
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
