const { version: packageVersion, repository } = require('../../package.json');

import { Method } from '../Api';

import { createClient } from './Client';

const BASE_URL = 'https://api.prezly.com';
const DEFAULT_USER_AGENT = `prezly-javascript-sdk/${packageVersion} (+${repository.url})`;
const ACCESS_TOKEN = 'example-access-token';
const DEFAULT_REQUEST_PROPS = {
    body: undefined,
    headers: {
        Accept: 'application/json',
        authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8',
        'User-Agent': DEFAULT_USER_AGENT,
    },
};

function successJsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        statusText: 'OK',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

describe('Client', () => {
    const coverageSdkUrl = 'v2/coverage';
    const defaultCoverageApiUrl = `${BASE_URL}/${coverageSdkUrl}`;

    beforeEach(() => {
        fetch.resetMocks();
    });

    describe('Coverage', () => {
        const getListPayload = (coverage) => ({
            sort: '-published_at',
            pagination: {
                offset: 0,
                limit: 20,
                matched_records_number: coverage.length,
                total_records_number: coverage.length,
            },
            coverage,
        });

        it('should call the list endpoint', async () => {
            const expectedPayload = getListPayload([]);
            fetch.mockResolvedValueOnce(successJsonResponse(expectedPayload));

            const prezlySdk = createClient({
                accessToken: ACCESS_TOKEN,
            });
            const result = await prezlySdk.coverage.list();

            expect(fetch).toHaveBeenCalledWith(defaultCoverageApiUrl, {
                ...DEFAULT_REQUEST_PROPS,
                method: Method.GET,
            });
            expect(result).toEqual(expectedPayload);
        });

        it('should call the GET :id endpoint', async () => {
            const coverage = { id: 123 };
            fetch.mockResolvedValueOnce(successJsonResponse({ coverage }));

            const prezlySdk = createClient({
                accessToken: ACCESS_TOKEN,
            });
            const result = await prezlySdk.coverage.get(coverage.id);

            expect(fetch).toHaveBeenCalledWith(`${defaultCoverageApiUrl}/${coverage.id}`, {
                ...DEFAULT_REQUEST_PROPS,
                method: Method.GET,
            });
            expect(result).toEqual(coverage);
        });

        it('should allow filtering by externalReferenceId', async () => {
            const externalReferenceId = 'external-ref-id';
            const coverage = { id: 123 };
            const expectedPayload = getListPayload([coverage]);
            fetch.mockResolvedValueOnce(successJsonResponse(expectedPayload));

            const prezlySdk = createClient({
                accessToken: ACCESS_TOKEN,
            });
            const result = await prezlySdk.coverage.getByExternalReferenceId(externalReferenceId);

            const search = `?include_deleted=on&query=%7B%22external_reference_id%22%3A%7B%22%24in%22%3A%5B%22${externalReferenceId}%22%5D%7D%7D`;
            expect(fetch).toHaveBeenCalledWith(`${defaultCoverageApiUrl}${search}`, {
                ...DEFAULT_REQUEST_PROPS,
                method: Method.GET,
            });
            expect(result).toEqual(coverage);
        });

        it('should return null from externalReferenceId no results found', async () => {
            const expectedPayload = getListPayload([]);
            fetch.mockResolvedValueOnce(successJsonResponse(expectedPayload));

            const prezlySdk = createClient({
                accessToken: ACCESS_TOKEN,
            });
            const result = await prezlySdk.coverage.getByExternalReferenceId('?');

            expect(result).toEqual(null);
        });

        it('should call create endpoint and pass the payload', async () => {
            const coverage = {
                url: 'https://example.com',
            };
            fetch.mockResolvedValueOnce(successJsonResponse({ coverage }));

            const prezlySdk = createClient({
                accessToken: ACCESS_TOKEN,
            });
            const result = await prezlySdk.coverage.create(coverage);

            expect(fetch).toHaveBeenCalledWith(defaultCoverageApiUrl, {
                ...DEFAULT_REQUEST_PROPS,
                method: Method.POST,
                body: JSON.stringify(coverage),
            });
            expect(result).toEqual(coverage);
        });

        it('should call update endpoint and pass the payload', async () => {
            const id = 123;
            const coverage = {
                url: 'https://prezly.com',
            };
            fetch.mockResolvedValueOnce(successJsonResponse({ coverage }));

            const prezlySdk = createClient({
                accessToken: ACCESS_TOKEN,
            });
            const result = await prezlySdk.coverage.update(id, coverage);

            expect(fetch).toHaveBeenCalledWith(`${defaultCoverageApiUrl}/${id}`, {
                ...DEFAULT_REQUEST_PROPS,
                method: Method.PATCH,
                body: JSON.stringify(coverage),
            });
            expect(result).toEqual(coverage);
        });

        it('should call delete endpoint', async () => {
            const id = 123;
            fetch.mockResolvedValueOnce(successJsonResponse(undefined, 204));

            const prezlySdk = createClient({
                accessToken: ACCESS_TOKEN,
            });
            const result = await prezlySdk.coverage.remove(id);

            expect(fetch).toHaveBeenCalledWith(`${defaultCoverageApiUrl}/${id}`, {
                ...DEFAULT_REQUEST_PROPS,
                method: Method.DELETE,
            });
            expect(result).toEqual(undefined);
        });
    });

    describe('custom options', () => {
        it('should allow overriding the url', async () => {
            fetch.mockResolvedValueOnce(successJsonResponse({}));

            // Intentionally using trailing `/` to test url sanitizing.
            const baseUrl = 'https://api.prezly.test/';
            const prezlySdk = createClient({
                accessToken: ACCESS_TOKEN,
                baseUrl,
            });
            await prezlySdk.coverage.list();

            expect(fetch).toHaveBeenCalledWith(`${baseUrl}${coverageSdkUrl}`, {
                ...DEFAULT_REQUEST_PROPS,
                method: Method.GET,
            });
        });

        it('should allow overriding the headers', async () => {
            fetch.mockResolvedValueOnce(successJsonResponse({}));

            const customHeaders = {
                'User-Agent': 'Test',
            };
            const prezlySdk = createClient({
                accessToken: ACCESS_TOKEN,
                headers: customHeaders,
            });
            await prezlySdk.coverage.list();

            expect(fetch).toHaveBeenCalledWith(defaultCoverageApiUrl, {
                ...DEFAULT_REQUEST_PROPS,
                headers: {
                    ...DEFAULT_REQUEST_PROPS.headers,
                    ...customHeaders,
                },
                method: Method.GET,
            });
        });
    });
});
