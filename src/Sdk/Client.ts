import { ClientOptions } from './types';
import ApiClient from './ApiClient';
import { Accounts } from './Accounts';
import Campaigns from './Campaigns';
import CampaignRecipients from './CampaignRecipients';
import Coverage from './Coverage';
import DeferredJobsApiClient from './DeferredJobsApiClient';
import Stories from './Stories';
import Snippets from './Snippets';
import Newsrooms from './Newsrooms';
import NewsroomCategories from './NewsroomCategories';
import NewsroomContacts from './NewsroomContacts';
import NewsroomLanguages from './NewsroomLanguages';
import NewsroomThemes from './NewsroomThemes';
import NewsroomWebhooks from './NewsroomWebhooks';
import NewsroomPrivacyRequests from './NewsroomPrivacyRequests';
import NewsroomDomains from './NewsroomDomains';
import SenderAddresses from './SenderAddresses';
import Subscriptions from './Subscriptions';
import Jobs from './Jobs';
import NewsroomGalleries from './NewsroomGalleries';
import Licenses from './Licenses';

const DEFAULT_BASE_URL = 'https://api.prezly.com';

export interface Client {
    accounts: Accounts;
    campaigns: Campaigns;
    campaignRecipients: CampaignRecipients;
    coverage: Coverage;
    jobs: Jobs;
    licenses: Licenses;
    newsrooms: Newsrooms;
    newsroomCategories: NewsroomCategories;
    newsroomContacts: NewsroomContacts;
    newsroomLanguages: NewsroomLanguages;
    newsroomThemes: NewsroomThemes;
    newsroomWebhooks: NewsroomWebhooks;
    newsroomPrivacyRequests: NewsroomPrivacyRequests;
    newsroomDomains: NewsroomDomains;
    newsroomGalleries: NewsroomGalleries;
    senderAddresses: SenderAddresses;
    stories: Stories;
    snippets: Snippets;
    subscriptions: Subscriptions;
}

export function createClient({
    accessToken,
    baseUrl = DEFAULT_BASE_URL,
    headers = {},
}: ClientOptions): Client {
    const apiClient = new DeferredJobsApiClient(
        new ApiClient({
            accessToken,
            baseUrl,
            headers,
        }),
    );

    return {
        accounts: new Accounts({ apiClient }),
        campaigns: new Campaigns({ apiClient }),
        campaignRecipients: new CampaignRecipients({ apiClient }),
        coverage: new Coverage({ apiClient }),
        jobs: new Jobs({ apiClient }),
        licenses: new Licenses({ apiClient }),
        newsrooms: new Newsrooms({ apiClient }),
        newsroomCategories: new NewsroomCategories({ apiClient }),
        newsroomContacts: new NewsroomContacts({ apiClient }),
        newsroomLanguages: new NewsroomLanguages({ apiClient }),
        newsroomThemes: new NewsroomThemes({ apiClient }),
        newsroomWebhooks: new NewsroomWebhooks({ apiClient }),
        newsroomPrivacyRequests: new NewsroomPrivacyRequests({ apiClient }),
        newsroomDomains: new NewsroomDomains({ apiClient }),
        newsroomGalleries: new NewsroomGalleries({ apiClient }),
        senderAddresses: new SenderAddresses({ apiClient }),
        stories: new Stories({ apiClient }),
        snippets: new Snippets({ apiClient }),
        subscriptions: new Subscriptions({ apiClient }),
    };
}
