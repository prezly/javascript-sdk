export interface SortOrder {
    columns: SortOrder.Column[];
}

export namespace SortOrder {
    export enum Direction {
        ASC = 'asc',
        DESC = 'desc',
    }

    export interface Column {
        name: string;
        direction: Direction;
    }

    export function empty(): SortOrder {
        return { columns: [] };
    }

    export function isEmpty(sortOrder: SortOrder | string | undefined): boolean {
        if (typeof sortOrder === 'undefined') {
            return true;
        }
        return toObject(sortOrder).columns.length === 0;
    }

    export function asc(column: string): SortOrder {
        validateColumnName(column);
        return {
            columns: [{ name: column, direction: Direction.ASC }],
        };
    }

    export function desc(column: string): SortOrder {
        validateColumnName(column);
        return {
            columns: [{ name: column, direction: Direction.DESC }],
        };
    }

    export function parse(sortOrder: string): SortOrder;
    export function parse(sortOrder: string | undefined): SortOrder | undefined;
    export function parse(sortOrder: string | undefined): SortOrder | undefined {
        if (typeof sortOrder === 'undefined') {
            return undefined;
        }
        const columns = sortOrder.split(',').map(parseColumn);
        return { columns };
    }

    export function stringify(sortOrder: SortOrder | string | undefined): string | undefined {
        if (typeof sortOrder === 'undefined') {
            return undefined;
        }
        if (typeof sortOrder === 'string') {
            return sortOrder;
        }
        if (isEmpty(sortOrder)) {
            return undefined;
        }
        return toString(sortOrder);
    }

    export function combine(sortOrder: string, append: string): string;
    export function combine(sortOrder: SortOrder, append: SortOrder): SortOrder;
    export function combine(
        sortOrder: SortOrder | string,
        another: SortOrder | string,
    ): SortOrder | string {
        if (typeof sortOrder === 'string' && typeof another === 'string') {
            const combined = stringify(combine(toObject(sortOrder), toObject(another)));
            if (typeof combined === 'undefined') {
                throw new Error('stringify() cannot return undefined. This should never happen.');
            }
            return combined;
        }

        if (typeof sortOrder === 'object' && typeof another === 'object') {
            return {
                columns: [...sortOrder.columns, ...toObject(another).columns],
            };
        }

        throw new Error('Both arguments of combine() should be of the same type.');
    }
}

function toObject(sortOrder: string | SortOrder): SortOrder {
    return typeof sortOrder === 'string' ? SortOrder.parse(sortOrder) : sortOrder;
}

function parseColumn(column: string): SortOrder.Column {
    if (column.startsWith('+')) {
        const [, name] = column.split('+');
        validateColumnName(name);
        return { name, direction: SortOrder.Direction.ASC };
    }
    if (column.startsWith('-')) {
        const [, name] = column.split('-');
        validateColumnName(name);
        return { name, direction: SortOrder.Direction.DESC };
    }
    validateColumnName(column);
    return { name: column, direction: SortOrder.Direction.ASC };
}

function toString(sortOrder: SortOrder): string;
function toString(direction: SortOrder.Direction): string;
function toString(sortOrder: SortOrder.Column): string;
function toString(arg: SortOrder | SortOrder.Column | SortOrder.Direction): string {
    if (arg === SortOrder.Direction.ASC) {
        return '+';
    }
    if (arg === SortOrder.Direction.DESC) {
        return '-';
    }
    if ('columns' in arg) {
        return arg.columns.map(toString).join(',');
    }
    return `${toString(arg.direction)}${arg.name}`;
}

function validateColumnName(name: string): void | never {
    if (name.length === 0) {
        throw new Error(`Invalid sort column name: '${name}'.`);
    }
}
