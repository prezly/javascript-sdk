import { ApiClient, DeferredJobsApiClient } from './api';
import { HeadersMap } from './http';

import { Accounts } from './Sdk/Accounts';
import Campaigns from './Sdk/Campaigns';
import CampaignRecipients from './Sdk/CampaignRecipients';
import Coverage from './Sdk/Coverage';
import Stories from './Sdk/Stories';
import Snippets from './Sdk/Snippets';
import Newsrooms from './Sdk/Newsrooms';
import NewsroomCategories from './Sdk/NewsroomCategories';
import NewsroomContacts from './Sdk/NewsroomContacts';
import NewsroomLanguages from './Sdk/NewsroomLanguages';
import NewsroomThemes from './Sdk/NewsroomThemes';
import NewsroomWebhooks from './Sdk/NewsroomWebhooks';
import NewsroomPrivacyRequests from './Sdk/NewsroomPrivacyRequests';
import NewsroomDomains from './Sdk/NewsroomDomains';
import SenderAddresses from './Sdk/SenderAddresses';
import Subscriptions from './Sdk/Subscriptions';
import Jobs from './Sdk/Jobs';
import NewsroomGalleries from './Sdk/NewsroomGalleries';
import Licenses from './Sdk/Licenses';

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
