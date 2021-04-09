import Culture from './Culture';
import NewsroomCompanyInformation from './NewsroomCompanyInformation';

export default interface NewsroomLanguageSettings {
    code: Culture['code'];
    locale: Culture;
    is_default: boolean;
    stories_count: number;
    company_information: NewsroomCompanyInformation;
}
