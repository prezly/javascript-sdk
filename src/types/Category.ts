import type { UploadedImage } from '@prezly/uploads';

import type { Culture, CultureRef } from './Culture';

export interface CategoryRef {
    id: number;
    display_name: string;
    display_description: string | null;
    i18n: {
        [localeCode: Culture.Code]: CategoryRef.Translation;
    };
}

export namespace CategoryRef {
    export interface Translation {
        locale: CultureRef;
        slug: string | null;
        name: string;
        description: string | null;
    }
}

export interface Category extends Omit<CategoryRef, 'i18n'> {
    stories_number: number;
    public_stories_number: number;
    i18n: {
        [localeCode: Culture.Code]: Category.Translation; // Extension over `CategoryRef.Translation`
    };
    image: UploadedImage | null;
    is_featured: boolean;
}

export namespace Category {
    export interface Translation extends CategoryRef.Translation {
        public_stories_number: number;
    }

    export function isTranslated<T extends Category, LocaleCode extends Culture['code']>(
        category: T,
        locale: LocaleIdentifier<LocaleCode>,
    ): category is WithNonEmptyTranslation<T, LocaleCode> {
        const translation = category.i18n[localeCode(locale)];
        return isNonEmpty(translation);
    }

    export function translation<T extends Category, LocaleCode extends Culture['code']>(
        category: T,
        locale: LocaleIdentifier<LocaleCode>,
    ) {
        const [translation] = Category.translations(category, locale);
        return translation as T extends WithNonEmptyTranslation<Category, LocaleCode>
            ? TranslatedCategory
            : TranslatedCategory | undefined;
    }

    export function translations(
        category: Category,
        locale?: LocaleIdentifier,
    ): TranslatedCategory[];

    export function translations(
        categories: Category[],
        locale?: LocaleIdentifier,
    ): TranslatedCategory[];

    export function translations(
        input: Category | Category[],
        locale?: LocaleIdentifier,
    ): TranslatedCategory[] {
        const code = locale ? localeCode(locale) : undefined;
        const categories = Array.isArray(input) ? input : [input];

        return categories.reduce<TranslatedCategory[]>((result, category) => {
            const translated = (code ? [category.i18n[code]] : Object.values(category.i18n))
                .filter(isNonEmpty)
                .map((translation) => {
                    return {
                        id: category.id,
                        locale: translation.locale.code,
                        slug: translation.slug,
                        name: translation.name,
                        description: translation.description,
                        public_stories_number: translation.public_stories_number,
                    };
                });

            return [...result, ...translated];
        }, []);
    }
}

export interface TranslatedCategory {
    id: Category['id'];
    locale: Culture['code'];
    slug: NonNullable<Category.Translation['slug']>;
    name: Category.Translation['name'];
    description: Category.Translation['description'];
    public_stories_number: Category.Translation['public_stories_number'];
}

type LocaleIdentifier<Locale extends Culture['code'] = Culture['code']> = Locale | { code: Locale };

type NonEmptyTranslation = Category.Translation & {
    slug: NonNullable<Category.Translation['slug']>;
    name: Exclude<Category.Translation['name'], ''>;
};

type WithNonEmptyTranslation<T extends Category, LocaleCode extends Culture['code']> = T & {
    i18n: {
        [localeCode in LocaleCode]: NonEmptyTranslation;
    };
};

function isNonEmpty(
    translation: Category.Translation | undefined,
): translation is NonEmptyTranslation {
    return Boolean(translation && translation.name && translation.slug);
}

function localeCode(locale: LocaleIdentifier): Culture['code'] {
    return typeof locale === 'string' ? locale : locale.code;
}
