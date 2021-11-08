/**
 * @see https://api.prezly.com/v2/common/schema.json#/definitions/Pagination
 */
export interface Pagination {
    matched_records_number: number;
    total_records_number: number;
}

export enum SelectionMode {
    ALL = 'all',
    IN = 'in',
    NOT_IN = 'not_in',
}

export interface SelectionValue<I = number> {
    mode: SelectionMode;
    ids: I[];
}
