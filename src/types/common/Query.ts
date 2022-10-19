/**
 * @see https://developers.prezly.com/docs/api/docs/06-prezly-query-language.md
 */
export type Query<F extends Query.Filter = Query.Filter> = Query.QueryObject<F> | string;

export namespace Query {
    export function stringify(query: Query | undefined | null): string | undefined {
        if (!query) {
            return undefined;
        }
        return typeof query === 'string' ? query : JSON.stringify(query);
    }

    type Value = string | number | boolean;

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

    export type PredicateFieldFilter<F extends string, P extends Predicate, V> = {
        [field in F]: Partial<{
            [predicate in P]: P extends OneToManyPredicate | ManyToManyPredicate ? V[] : V;
        }>;
    };

    export type ManyToManyFieldFilter<F extends string, V extends Value> = PredicateFieldFilter<
        F,
        ManyToManyPredicate,
        V
    >;
    export type OneToManyFieldFilter<F extends string, V extends Value> = PredicateFieldFilter<
        F,
        OneToManyPredicate,
        V
    >;
    export type TextFieldFilter<F extends string> = PredicateFieldFilter<F, TextPredicate, string>;
    export type EqualityFieldFilter<F extends string, V extends Value> = PredicateFieldFilter<
        F,
        EqualityPredicate,
        V
    >;
    export type ComparableFieldFilter<F extends string, V extends Value> = PredicateFieldFilter<
        F,
        ComparablePredicate,
        V
    >;

    export type Filter<
        F extends string = string,
        P extends Predicate = Predicate,
        V = Value,
    > = PredicateFieldFilter<F, P, V>;

    export type CombinedQuery<F extends Filter = Filter> = {
        [operator in `${LogicalOperator}`]: F[];
    };

    export type QueryObject<F extends Filter = Filter> = F | CombinedQuery<F>;
}
