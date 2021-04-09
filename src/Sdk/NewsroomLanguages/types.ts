import { NewsroomCompanyInformation, NewsroomLanguageSettings } from '../../types';

export interface NewsroomLanguagesListRequest {
    sortOrder?: string;
}

export interface NewsroomLanguagesListResponse {
    languages: NewsroomLanguageSettings[];
    sort: string;
}

export interface NewsroomLanguageSettingsUpdateRequest {
    company_information: Partial<NewsroomCompanyInformation>;
}
