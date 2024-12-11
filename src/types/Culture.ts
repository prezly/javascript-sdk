import type { Language } from './Language';

export interface CultureRef {
    code: Culture.Code;
    locale: Culture.Code;
    name: string;
    native_name: string;
    direction: `${Culture.TextDirection}`;
    language: Language;
    /**
     * @deprecated Use language.code instead
     */
    language_code: Culture.LangCode;
}

export type Culture = CultureRef;

export namespace Culture {
    export enum TextDirection {
        LTR = 'ltr',
        RTL = 'rtl',
    }

    /**
     * Primary locale code used everywhere in the Prezly app.
     */
    export type Code =
        | `${LangCode}`
        | `${LangCode}_${RegionCode}`
        | `${LangCode}_${ScriptCode}`
        | `${LangCode}_${ScriptCode}_${RegionCode}`;

    /**
     * Locale ISO code to be used in HTML attributes.
     */
    export type IsoCode =
        | `${LangCode}`
        | `${LangCode}-${RegionCode}`
        | `${LangCode}-${ScriptCode}`
        | `${LangCode}-${ScriptCode}-${RegionCode}`;

    export type LangCode = `${Lowercase<string>}`;
    export type ScriptCode = string;
    export type RegionCode = `${Uppercase<string>}`;

    export function isoCode(code: Code): IsoCode {
        return code.replace('_', '-') as IsoCode;
    }
}
