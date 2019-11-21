import { Method, HeadersMap, Response } from './types';
import createRequest from './createRequest';

const withAccessToken = (headers: HeadersMap = {}, accessToken: string): HeadersMap => ({
    ...headers,
    'x-access-token': accessToken,
});

interface Params {
    accessToken: string;
    headers?: HeadersMap;
    query?: object;
}

interface ParamsWithPayload extends Params {
    payload?: object;
}

const Api = {
    get: <P = any>(url: string, { accessToken, headers, query }: Params): Promise<Response<P>> =>
        createRequest(url, {
            headers: withAccessToken(headers, accessToken),
            method: Method.GET,
            query,
        }),

    post: <P = any>(
        url: string,
        { accessToken, headers, payload, query }: ParamsWithPayload,
    ): Promise<Response<P>> =>
        createRequest(url, {
            headers: withAccessToken(headers, accessToken),
            method: Method.POST,
            payload,
            query,
        }),

    put: <P = any>(
        url: string,
        { accessToken, headers, payload, query }: ParamsWithPayload,
    ): Promise<Response<P>> =>
        createRequest(url, {
            headers: withAccessToken(headers, accessToken),
            method: Method.PUT,
            payload,
            query,
        }),

    patch: <P = any>(
        url: string,
        { accessToken, headers, payload, query }: ParamsWithPayload,
    ): Promise<Response<P>> =>
        createRequest(url, {
            headers: withAccessToken(headers, accessToken),
            method: Method.PATCH,
            payload,
            query,
        }),

    delete: <P = any>(
        url: string,
        { accessToken, headers, payload, query }: ParamsWithPayload,
    ): Promise<Response<P>> =>
        createRequest(url, {
            headers: withAccessToken(headers, accessToken),
            method: Method.DELETE,
            payload,
            query,
        }),
};

export default Api;
