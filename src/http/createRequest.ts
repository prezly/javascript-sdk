import type { Fetch } from '../api';

import { ApiError } from './ApiError';
import {
    CONTENT_TYPE,
    INVALID_URL_ERROR_MESSAGE,
    NETWORK_PROBLEM_ERROR_MESSAGE,
} from './constants';
import { createUrlWithQuery } from './lib';
import type { Method, HeadersMap, ApiResponse } from './types';
import { HttpCodes } from './types';

function extractHeaders(headers: Headers): HeadersMap {
    const result: HeadersMap = {};

    headers.forEach((value, key) => {
        result[key] = value;
    });

    return result;
}

function extractResponse(response: Response) {
    return {
        status: response.status,
        statusText: response.statusText,
        headers: extractHeaders(response.headers),
    };
}

export function createFakeErrorPayload({
    status,
    statusText,
}: {
    status?: number;
    statusText?: string;
}) {
    return {
        status: 'error',
        code: status,
        message: `Something went wrong: ${[status, statusText].filter(Boolean).join(' ')}`,
        errors: {
            ':global': [
                {
                    code: status,
                    message: statusText,
                },
            ],
        },
    };
}

export async function createRequest<P = any>(
    fetchImpl: Fetch,
    url: string,
    options: {
        headers?: HeadersMap;
        method: Method;
        payload?: object;
        query?: object;
    },
): Promise<ApiResponse<P>> {
    const { headers, method, payload, query } = options;
    try {
        const urlWithQuery = createUrlWithQuery(url, query);
        const response = await fetchImpl(urlWithQuery.href, {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': CONTENT_TYPE,
                ...headers,
            },
            body: payload ? JSON.stringify(payload) : undefined,
        });

        // Fetch correctly throws an error in browser environment,
        // but when running in test environment (Jest), it fails silently
        // and 'response' becomes undefined, hence this extra condition.
        if (!response) {
            throw new Error(INVALID_URL_ERROR_MESSAGE);
        }

        // Response code is not between 200 - 299
        if (!response.ok) {
            // Try to parse the response as JSON, if it contains any error messages
            // from backend. If not, fake the error message.
            let responsePayload;
            try {
                responsePayload = await response.json();
            } catch (error) {
                responsePayload = createFakeErrorPayload(response);
            }

            throw new ApiError({
                payload: responsePayload,
                ...extractResponse(response),
            });
        }

        const responsePayload =
            response.status === HttpCodes.NO_CONTENT ? undefined : await response.json();

        return {
            payload: responsePayload,
            ...extractResponse(response),
        };
    } catch (error) {
        // Fetch throws an error, if there is a connection problem (eg. network is down).
        // We do not have access to response, so we need to fake the error payload.
        // Since we also throw when response is not ok, re-throw the response data if available.
        const {
            status,
            statusText = (error as any).message || NETWORK_PROBLEM_ERROR_MESSAGE,
            payload: errorPayload,
        } = error as any;

        throw new ApiError({
            payload:
                errorPayload ||
                createFakeErrorPayload({
                    status,
                    statusText,
                }),
            status,
            statusText,
            headers: (error as any).headers || {},
        });
    }
}
