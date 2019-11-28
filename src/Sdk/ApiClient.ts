import { Api, ApiResponse, HeadersMap, Params, ParamsWithPayload } from '../Api';

import { DEFAULT_USER_AGENT } from './constants';
import { stripSlashes } from './utils';

export interface Options {
    accessToken: string;
    baseUrl: string;
    headers: HeadersMap;
}

export default class ApiClient {
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

    public get<P = any>(
        endpointUri: string,
        { headers, query }: Params = {},
    ): Promise<ApiResponse<P>> {
        return Api.get<P>(this.buildEndpointUrl(endpointUri), {
            headers: {
                ...this.headers,
                ...headers,
            },
            query,
        });
    }

    public post<P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> {
        return Api.post<P>(this.buildEndpointUrl(endpointUri), {
            headers: {
                ...this.headers,
                ...headers,
            },
            payload,
            query,
        });
    }

    public put<P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> {
        return Api.put<P>(this.buildEndpointUrl(endpointUri), {
            headers: {
                ...this.headers,
                ...headers,
            },
            payload,
            query,
        });
    }

    public patch<P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> {
        return Api.patch<P>(this.buildEndpointUrl(endpointUri), {
            headers: {
                ...this.headers,
                ...headers,
            },
            payload,
            query,
        });
    }

    public delete<P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> {
        return Api.delete<P>(this.buildEndpointUrl(endpointUri), {
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
