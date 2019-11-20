export function getItemId<IdType extends number | string, T extends { id: IdType }>(
    itemOrItemId: T | IdType,
): IdType {
    return typeof itemOrItemId === 'object' ? itemOrItemId.id : itemOrItemId;
}
