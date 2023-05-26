/**
 * @see https://developers.prezly.com/docs/api/docs/06-prezly-query-language.md
 */
export type Query<F extends Query.Filter = Query.Filter> = F | Query.CombinedQuery<F>;

/**
 * @deprecated Please use Query object interface instead.
 */
export type QueryString = string;

export namespace Query {
    export function stringify<T extends Query>(
        query: T | QueryString | undefined | null,
    ): string | undefined {
        if (!query) {
            return undefined;
        }
        return typeof query === 'string' ? query : JSON.stringify(query);
    }

    export enum LogicalOperator {
        AND = '$and',
    }

    type Value = string | number | boolean | null;

    export enum Predicate {
        EQUALS = '$eq',
        NOT_EQUALS = '$ne',
        GREATER_THAN = '$gt',
        GREATER_EQUAL = '$ge',
        LESS_THAN = '$lt',
        LESS_EQUAL = '$le',
        LIKE = '$like',
        NOT_LIKE = '$unlike',
        IN = '$in',
        NOT_IN = '$nin',
        EVERY = '$all',
        SOME = '$any',
        NONE = '$none',
    }

    export function isPredicate(predicate: string): predicate is Predicate {
        return (Object.values(Predicate) as string[]).includes(predicate);
    }

    export type EqualityPredicate = Predicate.EQUALS | Predicate.NOT_EQUALS;

    export function isEqualityPredicate(predicate: Predicate): predicate is EqualityPredicate {
        return predicate === Predicate.EQUALS || predicate === Predicate.NOT_EQUALS;
    }

    export type ComparablePredicate =
        | Predicate.EQUALS
        | Predicate.NOT_EQUALS
        | Predicate.LESS_THAN
        | Predicate.LESS_EQUAL
        | Predicate.GREATER_THAN
        | Predicate.GREATER_EQUAL;

    export function isComparablePredicate(predicate: Predicate): predicate is ComparablePredicate {
        return (
            predicate === Predicate.EQUALS ||
            predicate === Predicate.NOT_EQUALS ||
            predicate === Predicate.LESS_THAN ||
            predicate === Predicate.LESS_EQUAL ||
            predicate === Predicate.GREATER_THAN ||
            predicate === Predicate.GREATER_EQUAL
        );
    }

    export type TextPredicate =
        | Predicate.EQUALS
        | Predicate.NOT_EQUALS
        | Predicate.LIKE
        | Predicate.NOT_LIKE;

    export function isTextPredicate(predicate: Predicate): predicate is TextPredicate {
        return (
            predicate === Predicate.EQUALS ||
            predicate === Predicate.NOT_EQUALS ||
            predicate === Predicate.LIKE ||
            predicate === Predicate.NOT_LIKE
        );
    }

    export type OneToManyPredicate = Predicate.IN | Predicate.NOT_IN;

    export function isOneToManyPredicate(predicate: Predicate): predicate is OneToManyPredicate {
        return predicate === Predicate.IN || predicate === Predicate.NOT_IN;
    }

    export type ManyToManyPredicate = Predicate.EVERY | Predicate.SOME | Predicate.NONE;

    export function isManyToManyPredicate(predicate: Predicate): predicate is ManyToManyPredicate {
        return (
            predicate === Predicate.EVERY ||
            predicate === Predicate.SOME ||
            predicate === Predicate.NONE
        );
    }

    export type Filter<F extends string = string, P extends Predicate = Predicate, V = Value> = {
        [field in F]: ExactlyOne<{
            [predicate in P]: P extends OneToManyPredicate | ManyToManyPredicate ? V[] : V;
        }>;
    };

    export type CombinedQuery<F extends Filter = Filter> = {
        [operator in `${LogicalOperator}`]: F[];
    };
}

/**
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types
 */
type ExactlyOne<TObj, TKey extends keyof TObj = keyof TObj> = TKey extends string
    ? { [key in TKey]: TObj[TKey] } & { [key in Exclude<keyof TObj, TKey>]?: never }
    : never;
