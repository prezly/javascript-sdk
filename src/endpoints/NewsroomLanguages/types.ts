import type { CultureRef, NewsroomLanguageSettings, SortOrder } from '../../types';

export interface ListOptions {
    sortOrder?: SortOrder | string;
}

export interface ListResponse {
    languages: NewsroomLanguageSettings[];
    sort: string;
}

export interface SettingsUpdateRequest {
    is_default?: true;
    code?: CultureRef['code'];
    company_information?: {
        name?: string;
        about?: string;
        about_plaintext?: string;
        // contact info
        email?: string | null;
        website?: string | null;
        phone?: string | null;
        address?: string | null;
        // social medias
        twitter?: string | null;
        facebook?: string | null;
        linkedin?: string | null;
        pinterest?: string | null;
        youtube?: string | null;
        instagram?: string | null;
        tiktok?: string | null;
        // GDPR
        email_disclaimer?: string;
        cookie_statement?: string;
        subscribe_disclaimer?: string;
        // SEO
        seo_settings?: {
            meta_title?: string | null;
            meta_description?: string | null;
        };
    };
}

export interface UnsafeUpdateErrorResponse {
    status: 'error';
    code: 'unsafe';
    message: string;
    errors: {
        ':global': [
            {
                code: 'will_update_stories' | 'will_overwrite_company_information' | string;
                message: string;
            },
        ];
    };
}
