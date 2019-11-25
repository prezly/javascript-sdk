import { Entity } from '../types';

/**
 * Remove heading and trailing slashes.
 * Examples:
 *  - https://example.com/ -> https://example.com
 *  - /v2/path -> v2/path
 *  - /v2/path/ -> v2/path
 */
export const stripSlashes = (url: string): string => url.replace(/^\/|\/$/g, '');

export function buildUriWithId(
    sdkUrl: string,
    itemOrItemId: string | Entity<number | string>,
): string {
    const itemId = typeof itemOrItemId === 'object' ? itemOrItemId.id : itemOrItemId;
    return `${sdkUrl}/${itemId}`;
}
