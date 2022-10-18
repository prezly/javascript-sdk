import { ApiClient, DeferredJobsApiClient } from './api';
import { HeadersMap } from './http';

import { Accounts } from './endpoints/Accounts';
import Campaigns from './endpoints/Campaigns';
import CampaignRecipients from './endpoints/CampaignRecipients';
import Coverage from './endpoints/Coverage';
import Stories from './endpoints/Stories';
import Snippets from './endpoints/Snippets';
import Newsrooms from './endpoints/Newsrooms';
import NewsroomCategories from './endpoints/NewsroomCategories';
import NewsroomContacts from './endpoints/NewsroomContacts';
import NewsroomLanguages from './endpoints/NewsroomLanguages';
import NewsroomThemes from './endpoints/NewsroomThemes';
import NewsroomWebhooks from './endpoints/NewsroomWebhooks';
import NewsroomPrivacyRequests from './endpoints/NewsroomPrivacyRequests';
import NewsroomDomains from './endpoints/NewsroomDomains';
import SenderAddresses from './endpoints/SenderAddresses';
import Subscriptions from './endpoints/Subscriptions';
import Jobs from './endpoints/Jobs';
import NewsroomGalleries from './endpoints/NewsroomGalleries';
import Licenses from './endpoints/Licenses';

const DEFAULT_BASE_URL = 'https://api.prezly.com';

export interface ClientOptions {
    accessToken: string;
    baseUrl?: string;
    headers?: HeadersMap;
}

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
        accounts: new Accounts(apiClient),
        campaigns: new Campaigns(apiClient),
        campaignRecipients: new CampaignRecipients(apiClient),
        coverage: new Coverage(apiClient),
        jobs: new Jobs(apiClient),
        licenses: new Licenses(apiClient),
        newsrooms: new Newsrooms(apiClient),
        newsroomCategories: new NewsroomCategories(apiClient),
        newsroomContacts: new NewsroomContacts(apiClient),
        newsroomLanguages: new NewsroomLanguages(apiClient),
        newsroomThemes: new NewsroomThemes(apiClient),
        newsroomWebhooks: new NewsroomWebhooks(apiClient),
        newsroomPrivacyRequests: new NewsroomPrivacyRequests(apiClient),
        newsroomDomains: new NewsroomDomains(apiClient),
        newsroomGalleries: new NewsroomGalleries(apiClient),
        senderAddresses: new SenderAddresses(apiClient),
        stories: new Stories(apiClient),
        snippets: new Snippets(apiClient),
        subscriptions: new Subscriptions(apiClient),
    };
}
