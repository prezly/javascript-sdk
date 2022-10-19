// TODO: Refine Query typings
/**
 * @see https://developers.prezly.com/docs/api/docs/06-prezly-query-language.md
 */
export type Query = object | string;

export namespace Query {
    export function stringify(query: Query | undefined | null): string | undefined {
        if (!query) {
            return undefined;
        }
        return typeof query === 'string' ? query : JSON.stringify(query);
    }
}
