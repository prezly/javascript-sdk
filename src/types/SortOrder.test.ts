import { describe, expect, it } from 'vitest';

import { SortOrder } from './SortOrder';

describe('SortOrder', () => {
    describe('empty', () => {
        it('should create an empty SortOrder value', () => {
            const order = SortOrder.empty();
            expect(order).toEqual({ columns: [] });
        });
    });

    describe('isEmpty', () => {
        it('should return true for undefined input', () => {
            expect(SortOrder.isEmpty(undefined)).toBe(true);
        });

        it('should return true for an empty SortOrder object', () => {
            const order = SortOrder.empty();
            expect(SortOrder.isEmpty(order)).toBe(true);
        });

        it('should return false for a non-empty SortOrder object', () => {
            const order = SortOrder.asc('id');
            expect(SortOrder.isEmpty(order)).toBe(false);
        });
    });

    describe('asc', () => {
        it('should create a single-column ascending order value', () => {
            const order = SortOrder.asc('id');

            expect(order).toEqual({
                columns: [{ name: 'id', direction: 'asc' }],
            });
        });

        it('should support prefixed column names', () => {
            const order = SortOrder.asc('recipient.contact.name');

            expect(order).toEqual({
                columns: [{ name: 'recipient.contact.name', direction: 'asc' }],
            });
        });

        it('should throw error for empty column name', () => {
            expect(() => SortOrder.asc('')).toThrow();
        });
    });

    describe('desc', () => {
        it('should create a single-column descending order value', () => {
            const order = SortOrder.desc('id');

            expect(order).toEqual({
                columns: [{ name: 'id', direction: 'desc' }],
            });
        });

        it('should support prefixed column names', () => {
            const order = SortOrder.desc('recipient.contact.name');

            expect(order).toEqual({
                columns: [{ name: 'recipient.contact.name', direction: 'desc' }],
            });
        });

        it('should throw error for empty column name', () => {
            expect(() => SortOrder.desc('')).toThrow();
        });
    });

    describe('parse', () => {
        it('should return undefined for undefined input value', () => {
            const order = SortOrder.parse(undefined);

            expect(order).toBeUndefined();
        });

        it('should parse sort order string prefixed with +', () => {
            const order = SortOrder.parse('+id');
            expect(order).toEqual({
                columns: [{ name: 'id', direction: 'asc' }],
            });
        });

        it('should parse sort order string prefixed with -', () => {
            const order = SortOrder.parse('-id');
            expect(order).toEqual({
                columns: [{ name: 'id', direction: 'desc' }],
            });
        });

        it('should parse unprefixed sort order string', () => {
            const order = SortOrder.parse('id');
            expect(order).toEqual({
                columns: [{ name: 'id', direction: 'asc' }],
            });
        });

        it('should parse multi-column sort-order string', () => {
            const order = SortOrder.parse('+id,title,-created_at');
            expect(order).toEqual({
                columns: [
                    { name: 'id', direction: 'asc' },
                    { name: 'title', direction: 'asc' },
                    { name: 'created_at', direction: 'desc' },
                ],
            });
        });
    });

    describe('stringify', () => {
        it('should return undefined for undefined input value', () => {
            const order = SortOrder.stringify(undefined);
            expect(order).toBeUndefined();
        });

        it('should return string for string input value', () => {
            const order = SortOrder.stringify('+id');
            expect(order).toBe('+id');
        });

        it('should return string for SortOrder input value', () => {
            const order = SortOrder.stringify(SortOrder.desc('created_at'));
            expect(order).toBe('-created_at');
        });

        it('should return + prefixed string for ascending SortOrder input value', () => {
            const order = SortOrder.stringify(SortOrder.asc('title'));
            expect(order).toBe('+title');
        });

        it('should return undefined for empty SortOrder object', () => {
            const order = SortOrder.stringify(SortOrder.empty());
            expect(order).toBeUndefined();
        });
    });

    describe('combine', () => {
        it('should return undefined for undefined input value', () => {
            const order = SortOrder.stringify(undefined);
            expect(order).toBeUndefined();
        });

        it('should return string for string input value', () => {
            const order = SortOrder.stringify('+id');
            expect(order).toBe('+id');
        });

        it('should return string for SortOrder input value', () => {
            const order = SortOrder.stringify(SortOrder.desc('created_at'));
            expect(order).toBe('-created_at');
        });

        it('should return + prefixed string for ascending SortOrder input value', () => {
            const order = SortOrder.stringify(SortOrder.asc('title'));
            expect(order).toBe('+title');
        });
    });
});
