export interface Tier {
    flat_amount: number;
    unit_amount: number;
    up_to: number | null;
}

export enum BillingSchema {
    PER_UNIT = 'per_unit',
    TIERED = 'tiered',
}

export enum TiersMode {
    GRADUATED = 'graduated',
    VOLUME = 'volume',
}
