export interface CountryRef {
    code: string;
    display_name: string;
}

export interface Country extends CountryRef {
    is_vat_applicable: boolean;
}
