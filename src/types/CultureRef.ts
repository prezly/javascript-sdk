export enum TextDirection {
    LTR = 'ltr',
    RTL = 'rtl',
}

export interface CultureRef {
    code: string;
    locale: string;
    name: string;
    native_name: string;
    direction: TextDirection;
    language_code: string;
}
