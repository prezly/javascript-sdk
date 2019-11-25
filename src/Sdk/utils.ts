import { Entity } from '../types';

/**
 * Remove heading and trailing slashes.
 * Examples:
 *  - https://example.com/ -> https://example.com
 *  - /v2/path -> v2/path
 *  - /v2/path/ -> v2/path
 */
const stripSlashes = (url: string): string => url.replace(/^\/|\/$/g, '');

export function buildUrl(baseUrl: string, sdkUrl: string): string {
    return `${stripSlashes(baseUrl)}/${stripSlashes(sdkUrl)}`;
}

export function buildUrlWithId(
    baseUrl: string,
    sdkUrl: string,
    itemOrItemId: string | Entity<number | string>,
): string {
    const itemId = typeof itemOrItemId === 'object' ? itemOrItemId.id : itemOrItemId;
    return `${buildUrl(baseUrl, sdkUrl)}/${itemId}`;
}
