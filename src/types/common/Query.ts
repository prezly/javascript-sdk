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

    export enum LogicalOperator {
        AND = '$and',
    }

    export type EqualityPredicate = Predicate.EQUALS | Predicate.NOT_EQUALS;

    export type ComparablePredicate =
        | Predicate.EQUALS
        | Predicate.NOT_EQUALS
        | Predicate.LESS_THAN
        | Predicate.LESS_EQUAL
        | Predicate.GREATER_THAN
        | Predicate.GREATER_EQUAL;

    export type TextPredicate =
        | Predicate.EQUALS
        | Predicate.NOT_EQUALS
        | Predicate.LIKE
        | Predicate.NOT_LIKE;

    export type OneToManyPredicate = Predicate.IN | Predicate.NOT_IN;

    export type ManyToManyPredicate = Predicate.EVERY | Predicate.SOME | Predicate.NONE;

    export type GenericFilter<F extends string, P extends Predicate, V> = {
        [field in F]: ExactlyOne<{
            [predicate in P]: P extends OneToManyPredicate | ManyToManyPredicate ? V[] : V;
        }>;
    };

    export type ManyToManyFilter<F extends string, V extends Value> = GenericFilter<
        F,
        ManyToManyPredicate,
        V
    >;
    export type OneToManyFilter<F extends string, V extends Value> = GenericFilter<
        F,
        OneToManyPredicate,
        V
    >;
    export type TextFilter<F extends string> = GenericFilter<F, TextPredicate, string>;
    export type EqualityFilter<F extends string, V extends Value> = GenericFilter<
        F,
        EqualityPredicate,
        V
    >;
    export type ComparableFilter<F extends string, V extends Value> = GenericFilter<
        F,
        ComparablePredicate,
        V
    >;

    export type Filter<
        F extends string = string,
        P extends Predicate = Predicate,
        V = Value,
    > = GenericFilter<F, P, V>;

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
