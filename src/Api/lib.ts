import nodeUrl from 'url';
import queryString, { ParsedQuery } from 'query-string';

import { DeferredJobResponse } from './types';

const URL = typeof window === 'undefined' ? nodeUrl.URL : window.URL;

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

export function isDeferredJobResponse(value: any): value is DeferredJobResponse {
    return (
        value &&
        typeof value === 'object' &&
        typeof value.status === 'string' &&
        value.progress &&
        typeof value.progress === 'object' &&
        typeof value.progress.id === 'string' &&
        Array.isArray(value.progress.links) &&
        value.progress.links.every((link: any) => typeof link === 'string')
    );
}
