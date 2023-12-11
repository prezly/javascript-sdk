import { describe, expect, it } from 'vitest';

import { createUrlWithQuery } from './lib';

const URL_DATA = {
    protocol: 'http:',
    hostname: 'rock.prezly.test',
    pathname: '/api/v1/contacts',
    search: '?query=param',
    href: '',
};

const API_URL = `${URL_DATA.protocol}//${URL_DATA.hostname}${URL_DATA.pathname}${URL_DATA.search}`;

URL_DATA.href = API_URL;

describe('createUrlWithQuery', () => {
    it('should return URL object', () => {
        const url = createUrlWithQuery(API_URL);

        expect(url).toEqual(expect.objectContaining(URL_DATA));
    });

    it('should append query params', () => {
        // param keys are sorted alphabetically, use a key which comes after `query`
        const query = { query2: 'val' };
        const queryString = '&query2=val';
        const url = createUrlWithQuery(API_URL, query);

        expect(url).toEqual(
            expect.objectContaining({
                ...URL_DATA,
                href: `${URL_DATA.href}${queryString}`,
                search: `${URL_DATA.search}${queryString}`,
            }),
        );
    });

    it('should skip the query if the value is null or not an object', () => {
        const invalidQueries = [null, 'a=1', 1, true];
        invalidQueries.forEach((query) => {
            expect(createUrlWithQuery(API_URL, query as any)).toEqual(
                expect.objectContaining(URL_DATA),
            );
        });
    });

    it('should override query in the provided url', () => {
        const query = { query: 'bar' };
        const queryString = '?query=bar';
        const url = createUrlWithQuery(API_URL, query);

        expect(
            url,
            expect.objectContaining({
                ...URL_DATA,
                href: `${URL_DATA.protocol}//${URL_DATA.hostname}${URL_DATA.pathname}${queryString}`,
                search: queryString,
            }),
        );
    });
});
