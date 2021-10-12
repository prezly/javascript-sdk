export enum TextDirection {
    LTR = 'ltr',
    RTL = 'rtl',
}

export default interface CultureRef {
    code: string;
    locale: string;
    name: string;
    direction: TextDirection;
    language_code: string;
}
