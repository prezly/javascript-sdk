import { ApiResponse, Method, Params, ParamsWithPayload } from './types';
import createRequest from './createRequest';

const Api = {
    get: <P = any>(url: string, { headers, query }: Params = {}): Promise<ApiResponse<P>> =>
        createRequest(url, {
            headers,
            method: Method.GET,
            query,
        }),

    post: <P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> =>
        createRequest(url, {
            headers,
            method: Method.POST,
            payload,
            query,
        }),

    put: <P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> =>
        createRequest(url, {
            headers,
            method: Method.PUT,
            payload,
            query,
        }),

    patch: <P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> =>
        createRequest(url, {
            headers,
            method: Method.PATCH,
            payload,
            query,
        }),

    delete: <P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): Promise<ApiResponse<P>> =>
        createRequest(url, {
            headers,
            method: Method.DELETE,
            payload,
            query,
        }),
};

export default Api;
