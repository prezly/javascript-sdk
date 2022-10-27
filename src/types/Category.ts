import type { CultureRef } from './Culture';
import type { Entity } from './Entity';

export interface Category extends Entity<number> {
    id: number;
    display_name: string;
    display_description: string | null;
    i18n: {
        [localeCode: string]: {
            description: string | null;
            locale: CultureRef;
            name: string;
            slug: string | null;
        };
    };
    stories_number: number;
}
