import { vi, beforeEach, describe, expect, test } from 'vitest';
import type { MockResponseInitFunction } from 'vitest-fetch-mock';
import createFetchMock from 'vitest-fetch-mock';

import { ApiError } from './ApiError';
import { createFakeErrorPayload } from './createRequest';
import { createHttpClient } from './HttpClient';
import { createUrlWithQuery } from './lib';
import { Method } from './types';

const fetch = createFetchMock(vi);

const API_URL_CORRECT = 'http://rock.prezly.test/api/v1/contacts';
const API_URL_INCORRECT = 'htp:/rock.prezly.test/api/v1/contacts';

const DEFAULT_REQUEST_PROPS = {
    body: undefined,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
    },
};

function successJsonResponse(body: any): MockResponseInitFunction {
    return () => ({
        body: JSON.stringify(body),
        init: {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });
}

function errorJSONResponse(body: any): MockResponseInitFunction {
    return () => ({
        body: JSON.stringify(body),
        init: {
            status: 500,
            statusText: 'Internal Server Error',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });
}

describe('HttpClient', () => {
    const http = createHttpClient({ fetch: fetch as typeof global.fetch });

    beforeEach(() => {
        fetch.resetMocks();
    });

    test('it should resolve with correct payload', async () => {
        const expectedPayload = {
            foo: 'bar',
        };

        fetch.mockResponseOnce(successJsonResponse(expectedPayload));

        const actualResponse = await http.get(API_URL_CORRECT);

        expect(actualResponse.status).toEqual(200);
        expect(actualResponse.payload).toEqual(expectedPayload);
    });

    test('it should reject with correct payload', async () => {
        const expectedPayload = {
            foo: 'bar',
        };

        fetch.mockResponseOnce(errorJSONResponse(expectedPayload));

        try {
            await http.get(API_URL_CORRECT);
        } catch (error) {
            expect(error).instanceOf(ApiError);

            if (!(error instanceof ApiError)) throw error;

            expect(error.status).toEqual(500);
            expect(error.payload).toEqual(expectedPayload);
        }
    });

    test('it should reject with Invalid URL provided', async () => {
        const errorMessage = 'Invalid URL provided';
        // Fetch mock doesn't validate the URL so we mock the error.
        fetch.mockRejectOnce(new Error(errorMessage));
        try {
            await http.get(API_URL_INCORRECT);
        } catch (error) {
            expect(error).instanceOf(ApiError);

            if (!(error instanceof ApiError)) throw error;

            const expectedErrorResponse = createFakeErrorPayload({
                status: undefined,
                statusText: errorMessage,
            });

            expect(error.payload).toEqual(expectedErrorResponse);
        }
    });

    test('it should create a GET request', async () => {
        fetch.mockResponseOnce(successJsonResponse({}));

        await http.get(API_URL_CORRECT);

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT).href;

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: Method.GET,
        });
    });

    test('it should create a GET request with query params', async () => {
        fetch.mockResponseOnce(successJsonResponse({}));

        const query = { foo: 'bar' };
        await http.get(API_URL_CORRECT, {
            query,
        });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query).href;

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: Method.GET,
        });
    });

    test('it should create a POST request', async () => {
        fetch.mockResponseOnce(successJsonResponse({}));

        const query = {
            foo: 'bar',
        };

        const payload = {
            foo: 'bar',
        };

        await http.post(API_URL_CORRECT, {
            payload,
            query,
        });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query).href;

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: Method.POST,
            body: JSON.stringify(payload),
        });
    });

    test('it should create a PUT request', async () => {
        fetch.mockResponseOnce(successJsonResponse({}));

        const query = {
            foo: 'bar',
        };

        const payload = {
            foo: 'bar',
        };

        await http.put(API_URL_CORRECT, {
            payload,
            query,
        });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query).href;

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: Method.PUT,
            body: JSON.stringify(payload),
        });
    });

    test('it should create a PATCH request', async () => {
        fetch.mockResponseOnce(successJsonResponse({}));

        const query = {
            foo: 'bar',
        };

        const payload = {
            foo: 'bar',
        };

        await http.patch(API_URL_CORRECT, {
            payload,
            query,
        });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query).href;

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: Method.PATCH,
            body: JSON.stringify(payload),
        });
    });

    test('it should create a DELETE request', async () => {
        fetch.mockResponseOnce(successJsonResponse({}));

        const query = {
            foo: 'bar',
        };

        await http.delete(API_URL_CORRECT, {
            query,
        });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query).href;

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: Method.DELETE,
        });
    });

    test('it should create a DELETE request (with body)', async () => {
        fetch.mockResponseOnce(successJsonResponse({}));

        const query = {
            foo: 'bar',
        };

        const payload = {
            foo: 'bar',
        };

        await http.delete(API_URL_CORRECT, {
            payload,
            query,
        });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query).href;

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: Method.DELETE,
            body: JSON.stringify(payload),
        });
    });
});
