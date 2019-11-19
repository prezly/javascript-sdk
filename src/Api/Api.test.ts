import { Response } from 'node-fetch';

import { createUrlWithQuery } from './lib';
import { createFakeErrorPayload } from './createRequest';
import Api from './Api';

const API_URL_CORRECT = 'http://rock.prezly.test/api/v1/contacts';
const API_URL_INCORRECT = 'htp:/rock.prezly.test/api/v1/contacts';

const DEFAULT_REQUEST_PROPS = {
    body: undefined,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
    },
};

function successJSONResponse(body: object) {
    return new Response(JSON.stringify(body), {
        status: 200,
        statusText: 'OK',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

function errorJSONResponse(body: object) {
    return new Response(JSON.stringify(body), {
        status: 500,
        statusText: 'Internal Server Error',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

describe('Api.js', () => {
    it('should resolve with correct payload', async () => {
        const expectedPayload = {
            foo: 'bar',
        };

        const expectedResponse = successJSONResponse(expectedPayload);
        global.fetch.mockResolvedValueOnce(expectedResponse);

        const actualResponse = await Api.get(API_URL_CORRECT);

        expect(actualResponse.status).toEqual(200);
        expect(actualResponse.payload).toEqual(expectedPayload);
    });

    it('should reject with correct payload', async () => {
        const expectedPayload = {
            foo: 'bar',
        };

        const expectedResponse = errorJSONResponse(expectedPayload);
        global.fetch.mockResolvedValueOnce(expectedResponse);

        try {
            await Api.get(API_URL_CORRECT);
        } catch ({ status, payload }) {
            expect(status).toEqual(500);
            expect(payload).toEqual(expectedPayload);
        }
    });

    it('should reject with Invalid URL provided', async () => {
        const errorMessage = 'Invalid URL provided';
        // Fetch mock doesn't validate the URL so we mock the error.
        global.fetch.mockRejectOnce(new Error(errorMessage));
        try {
            await Api.get(API_URL_INCORRECT);
        } catch ({ payload }) {
            const expectedErrorResponse = createFakeErrorPayload({
                status: undefined,
                statusText: errorMessage,
            });

            expect(payload).toEqual(expectedErrorResponse);
        }
    });

    it('should create a GET request', async () => {
        const response = successJSONResponse({});

        global.fetch.mockResolvedValueOnce(response);

        await Api.get(API_URL_CORRECT);

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: 'GET',
        });
    });

    it('should create a GET request with query params', async () => {
        const response = successJSONResponse({});
        global.fetch.mockResolvedValueOnce(response);

        const query = { foo: 'bar' };
        await Api.get(API_URL_CORRECT, { query });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: 'GET',
        });
    });

    it('should create a POST request', async () => {
        const response = successJSONResponse({});
        global.fetch.mockResolvedValueOnce(response);

        const query = {
            foo: 'bar',
        };

        const payload = {
            foo: 'bar',
        };

        await Api.post(API_URL_CORRECT, { query, payload });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: 'POST',
            body: JSON.stringify(payload),
        });
    });

    it('should create a PUT request', async () => {
        const response = successJSONResponse({});
        global.fetch.mockResolvedValueOnce(response);

        const query = {
            foo: 'bar',
        };

        const payload = {
            foo: 'bar',
        };

        await Api.put(API_URL_CORRECT, { query, payload });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: 'PUT',
            body: JSON.stringify(payload),
        });
    });

    it('should create a PATCH request', async () => {
        const response = successJSONResponse({});
        global.fetch.mockResolvedValueOnce(response);

        const query = {
            foo: 'bar',
        };

        const payload = {
            foo: 'bar',
        };

        await Api.patch(API_URL_CORRECT, { query, payload });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: 'PATCH',
            body: JSON.stringify(payload),
        });
    });

    it('should create a DELETE request', async () => {
        const response = successJSONResponse({});
        global.fetch.mockResolvedValueOnce(response);

        const query = {
            foo: 'bar',
        };

        await Api.delete(API_URL_CORRECT, { query });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: 'DELETE',
        });
    });

    it('should create a DELETE request (with body)', async () => {
        const response = successJSONResponse({});
        global.fetch.mockResolvedValueOnce(response);

        const query = {
            foo: 'bar',
        };

        const payload = {
            foo: 'bar',
        };

        await Api.delete(API_URL_CORRECT, { query, payload });

        const expectedUrl = createUrlWithQuery(API_URL_CORRECT, query);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            ...DEFAULT_REQUEST_PROPS,
            method: 'DELETE',
            body: JSON.stringify(payload),
        });
    });
});
