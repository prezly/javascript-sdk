import type { Notification } from './common';
import type { CultureRef } from './Culture';
import type { NewsroomCompanyInformation } from './NewsroomCompanyInformation';

export interface NewsroomLanguageSettings {
    categories_count: number;
    code: CultureRef['code'];
    company_information: NewsroomCompanyInformation;
    is_default: boolean;
    locale: CultureRef;
    stories_count: number;
    public_stories_count: number;
    default_email_disclaimer: string;
    default_cookie_statement: string;
    default_subscribe_disclaimer: string;
    notifications: Notification[];
}
