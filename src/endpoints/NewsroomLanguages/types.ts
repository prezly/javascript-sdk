import { CultureRef, NewsroomCompanyInformation, NewsroomLanguageSettings } from '../../types';

export interface NewsroomLanguagesListRequest {
    sortOrder?: string;
}

export interface NewsroomLanguagesListResponse {
    languages: NewsroomLanguageSettings[];
    sort: string;
}

export interface NewsroomLanguageSettingsUpdateRequest {
    is_default?: true;
    code?: CultureRef['code'];
    company_information?: Partial<NewsroomCompanyInformation>;
}

export interface UnsafeNewsroomUpdateErrorResponse {
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
