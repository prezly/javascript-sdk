import { URL } from 'url';
import queryString, { ParsedQuery } from 'query-string';

const parseUrlParams = (query: string): ParsedQuery =>
    queryString.parse(query, { arrayFormat: 'bracket' });

const stringifyUrlParams = (params: ParsedQuery): string =>
    queryString.stringify(params, { arrayFormat: 'bracket' });

export const createUrlWithQuery = (url = '', query?: object): URL => {
    const urlWithQuery = new URL(url);

    if (typeof query === 'object' && query !== null) {
        urlWithQuery.search = stringifyUrlParams({
            ...parseUrlParams(urlWithQuery.search),
            ...query,
        });
    }

    return urlWithQuery;
};
