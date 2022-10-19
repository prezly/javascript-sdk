import { CultureRef, NewsroomCompanyInformation, NewsroomLanguageSettings } from '../../types';

export interface ListRequest {
    sortOrder?: string;
}

export interface ListResponse {
    languages: NewsroomLanguageSettings[];
    sort: string;
}

export interface SettingsUpdateRequest {
    is_default?: true;
    code?: CultureRef['code'];
    company_information?: Partial<NewsroomCompanyInformation>;
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
