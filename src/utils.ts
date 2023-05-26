/**
 * Remove heading and trailing slashes.
 * Examples:
 *  - https://example.com/ -> https://example.com
 *  - /v2/path -> v2/path
 *  - /v2/path/ -> v2/path
 */
export function stripSlashes(url: string): string {
    return url.replace(/^\/|\/$/g, '');
}

function pad(num: number): string {
    const abs = Math.floor(Math.abs(num));
    return (abs < 10 ? '0' : '') + abs;
}

/**
 * @see https://stackoverflow.com/a/17415677/1895069
 */
export function toIso8601(date: Date): string {
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';

    return (
        date.getFullYear() +
        '-' +
        pad(date.getMonth() + 1) +
        '-' +
        pad(date.getDate()) +
        'T' +
        pad(date.getHours()) +
        ':' +
        pad(date.getMinutes()) +
        ':' +
        pad(date.getSeconds()) +
        sign +
        pad(offset / 60) +
        ':' +
        pad(offset % 60)
    );
}

export function isNumber(x: unknown): x is number {
    return typeof x === 'number';
}

export function isString(x: unknown): x is string {
    return typeof x === 'string';
}

export function isBoolean(x: unknown): x is boolean {
    return typeof x === 'boolean';
}

export function isArrayOf<T>(guard: (x: unknown) => x is T, x: unknown): x is T {
    return Array.isArray(x) && x.every(guard);
}
