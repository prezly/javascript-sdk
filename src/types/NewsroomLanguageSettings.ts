import Culture from './Culture';
import NewsroomCompanyInformation from './NewsroomCompanyInformation';

export default interface NewsroomLanguageSettings {
    categories_count: number;
    code: Culture['code'];
    company_information: NewsroomCompanyInformation;
    is_default: boolean;
    locale: Culture;
    stories_count: number;
}
