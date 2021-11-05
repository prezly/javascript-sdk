import { CultureRef } from './CultureRef';

export interface Category {
    display_description: string | null;
    display_name: string;
    i18n: {
        [localeCode: string]: {
            description: string | null;
            locale: CultureRef;
            name: string;
            slug: string | null;
        };
    };
    id: number;
    stories_number: number;
}
