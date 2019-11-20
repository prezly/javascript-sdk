import { Method, HeadersMap, Response } from './types';
import createRequest from './createRequest';

const Api = {
    get: <P = any>(
        url: string,
        { query, headers }: { headers?: HeadersMap; query?: object } = {},
    ): Promise<Response<P>> =>
        createRequest(url, {
            method: Method.GET,
            headers,
            query,
        }),

    post: <P = any>(
        url: string,
        {
            headers,
            query,
            payload,
        }: { headers?: HeadersMap; query?: object; payload?: object } = {},
    ): Promise<Response<P>> =>
        createRequest(url, {
            method: Method.POST,
            headers,
            query,
            payload,
        }),

    put: <P = any>(
        url: string,
        {
            headers,
            query,
            payload,
        }: { headers?: HeadersMap; query?: object; payload?: object } = {},
    ): Promise<Response<P>> =>
        createRequest(url, {
            method: Method.PUT,
            headers,
            query,
            payload,
        }),

    patch: <P = any>(
        url: string,
        {
            headers,
            query,
            payload,
        }: { headers?: HeadersMap; query?: object; payload?: object } = {},
    ): Promise<Response<P>> =>
        createRequest(url, {
            method: Method.PATCH,
            headers,
            query,
            payload,
        }),

    delete: <P = any>(
        url: string,
        {
            headers,
            query,
            payload,
        }: { headers?: HeadersMap; query?: object; payload?: object } = {},
    ): Promise<Response<P>> =>
        createRequest(url, {
            method: Method.DELETE,
            headers,
            query,
            payload,
        }),
};

export default Api;
