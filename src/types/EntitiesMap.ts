export interface Entity<T extends number | string = number> {
    id: T;
}

export interface EntitiesMap<E = Entity> {
    [index: number]: E;
}
