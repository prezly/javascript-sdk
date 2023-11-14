import type { Culture, CultureRef } from './Culture';

export interface CategoryRef {
    id: number;
    display_name: string;
    display_description: string | null;
    i18n: {
        [localeCode: Culture.Code]: Category.Translation;
    };
    stories_number: number;
}

export interface Category extends CategoryRef {
    stories_number: number;
    public_stories_number: number;
}

export namespace Category {
    export interface Translation {
        locale: CultureRef;
        slug: string | null;
        name: string;
        description: string | null;
    }
}
