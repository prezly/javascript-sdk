import { CultureRef } from './CultureRef';
import { NewsroomCompanyInformation } from './NewsroomCompanyInformation';

export interface NewsroomLanguageSettings {
    categories_count: number;
    code: CultureRef['code'];
    company_information: NewsroomCompanyInformation;
    is_default: boolean;
    locale: CultureRef;
    stories_count: number;
}
