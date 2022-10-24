export interface CultureRef {
    code: string;
    locale: string;
    name: string;
    native_name: string;
    direction: Culture.TextDirection;
    language_code: string;
}

export namespace Culture {
    export enum TextDirection {
        LTR = 'ltr',
        RTL = 'rtl',
    }
}