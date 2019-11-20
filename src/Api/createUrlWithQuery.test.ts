import { createUrlWithQuery } from './lib';

interface UrlData {
    protocol: string;
    hostname: string;
    pathname: string;
    search: string;
    href: string;
}

const URL_DATA: UrlData = {
    protocol: 'http:',
    hostname: 'rock.prezly.test',
    pathname: '/api/v1/contacts',
    search: '?query=param',
    href: '',
};

const API_URL = `${URL_DATA.protocol}//${URL_DATA.hostname}${URL_DATA.pathname}${URL_DATA.search}`;
URL_DATA.href = API_URL;

function assertURLStructure(actual: UrlData, expected = URL_DATA) {
    const keys = Object.keys(expected) as (keyof UrlData)[];
    keys.forEach((key) => expect(actual[key]).toBe(expected[key]));
}

describe('createUrlWithQuery', () => {
    it('should return URL object', () => {
        const url = createUrlWithQuery(API_URL);

        assertURLStructure(url);
    });

    it('should append query params', () => {
        // param keys are sorted alphabetically, use a key which comes after `query`
        const query = { query2: 'val' };
        const queryString = '&query2=val';
        const url = createUrlWithQuery(API_URL, query);

        assertURLStructure(url, {
            ...URL_DATA,
            href: `${URL_DATA.href}${queryString}`,
            search: `${URL_DATA.search}${queryString}`,
        });
    });

    it('should skip the query if the value is null or not an object', () => {
        const invalidQueries = [null, 'a=1', 1, true];
        invalidQueries.forEach((query: any) => {
            assertURLStructure(createUrlWithQuery(API_URL, query));
        });
    });

    it('should override query in the provided url', () => {
        const query = { query: 'bar' };
        const queryString = '?query=bar';
        const url = createUrlWithQuery(API_URL, query);

        assertURLStructure(url, {
            ...URL_DATA,
            href: `${URL_DATA.protocol}//${URL_DATA.hostname}${URL_DATA.pathname}${queryString}`,
            search: queryString,
        });
    });
});
