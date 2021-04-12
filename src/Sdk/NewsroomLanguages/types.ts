import { Culture, NewsroomCompanyInformation, NewsroomLanguageSettings } from '../../types';

export interface NewsroomLanguagesListRequest {
    sortOrder?: string;
}

export interface NewsroomLanguagesListResponse {
    languages: NewsroomLanguageSettings[];
    sort: string;
}

export interface NewsroomLanguageSettingsUpdateRequest {
    is_default?: true;
    code?: Culture['code'];
    company_information?: Partial<NewsroomCompanyInformation>;
}

export interface UnsafeNewsroomUpdateErrorResponse {
    status: 'error';
    code: 'unsafe';
    message: string;
    errors: {
        ':global': [
            {
                code: 'will_update_stories' | string;
                message: string;
            },
        ];
    };
}
