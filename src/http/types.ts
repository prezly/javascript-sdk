import type { Fetch } from '../api/types';

export enum HttpCodes {
    ACCEPTED = 202,
    NO_CONTENT = 204,
    NOT_FOUND = 404,
    CONFLICT = 409,
    GONE = 410,
    PRECONDITION_FAILED = 412,
}

export enum Method {
    DELETE = 'DELETE',
    GET = 'GET',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
}

export interface HeadersMap {
    [name: string]: string;
}

export interface Params {
    fetch?: Fetch;
    headers?: HeadersMap;
    query?: Record<string, undefined | boolean | number | string | number[] | string[]>;
}

export interface ParamsWithPayload extends Params {
    payload?: object;
}

export interface DeferredJobResponse {
    status: 'accepted';
    progress: {
        id: string;
        links: string[];
    };
}

export interface ApiErrorMessage {
    code: string;
    message: string;
    errors?: {
        code: string;
        message: string;
        source: { pointer: string };
    }[];
}

export interface ApiErrorPayloadErrors {
    [key: string]: ApiErrorMessage[];
}

export interface ApiErrorPayload {
    code: string;
    errors: ApiErrorPayloadErrors;
    message: string;
    status: string;
    warnings?: {
        field: string;
        scope: string;
        text: string;
        value: number | string | object[];
    }[];
}

export interface ApiResponse<V = any> {
    payload: V;
    headers: HeadersMap;
    status: number | undefined;
    statusText: string;
}
