type LangCode = `${Lowercase<string>}`;
type UnderscoreCode = `${LangCode}` | `${LangCode}_${string}`;

export interface CultureRef {
    code: UnderscoreCode;
    locale: UnderscoreCode;
    name: string;
    native_name: string;
    direction: `${Culture.TextDirection}`;
    language_code: LangCode;
}

export type Culture = CultureRef;

export namespace Culture {
    export enum TextDirection {
        LTR = 'ltr',
        RTL = 'rtl',
    }
}
