export interface CultureRef {
    code: Culture.Code;
    locale: Culture.Code;
    name: string;
    native_name: string;
    direction: `${Culture.TextDirection}`;
    language_code: Culture.LangCode;
}

export type Culture = CultureRef;

export namespace Culture {
    export enum TextDirection {
        LTR = 'ltr',
        RTL = 'rtl',
    }

    export type LangCode = `${Lowercase<string>}`;
    export type ScriptCode = string;
    export type RegionCode = `${Uppercase<string>}`;

    /**
     * Primary locale code used everywhere in the Prezly app.
     */
    export type Code =
        | `${LangCode}`
        | `${LangCode}_${RegionCode}`
        | `${LangCode}_${ScriptCode}`
        | `${LangCode}_${ScriptCode}_${RegionCode}`;
}
