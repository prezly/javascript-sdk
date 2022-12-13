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

    export function parse(sortOrder: string): SortOrder;
    export function parse(sortOrder: string | undefined): SortOrder | undefined;
    export function parse(sortOrder: string | undefined): SortOrder | undefined {
        if (typeof sortOrder === 'undefined') {
            return undefined;
        }
        const columns = sortOrder.split(',').map(parseColumn);
        return { columns };
    }

    export function stringify(sortOrder: SortOrder | string): string;
    export function stringify(sortOrder: SortOrder | string | undefined): string | undefined;
    export function stringify(sortOrder: SortOrder | string | undefined): string | undefined {
        if (typeof sortOrder === 'undefined') {
            return undefined;
        }
        if (typeof sortOrder === 'string') {
            return sortOrder;
        }
        return toString(sortOrder);
    }

    export function combine(sortOrder: string, append: string): string;
    export function combine(sortOrder: SortOrder, append: SortOrder): SortOrder;
    export function combine(
        sortOrder: string | SortOrder,
        another: string | SortOrder,
    ): string | SortOrder {
        if (typeof sortOrder === 'string') {
            return stringify(combine(toObject(sortOrder), toObject(another)));
        }

        return {
            columns: [...sortOrder.columns, ...toObject(another).columns],
        };
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
    if (!name.match(/^([\w_]+\.)*[\w_]+$/)) {
        throw new Error(`Invalid sort column name: '${name}'.`);
    }
}
