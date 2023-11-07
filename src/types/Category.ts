import type { CultureRef } from './Culture';

export interface CategoryRef {
    id: number;
    display_name: string;
    display_description: string | null;
    i18n: {
        [localeCode: CultureRef['code']]: {
            description: string | null;
            locale: CultureRef;
            name: string;
            slug: string | null;
        };
    };
    stories_number: number;
}

export interface Category extends CategoryRef {
    stories_number: number;
    public_stories_number: number;
}
