import { ApiClient, DeferredJobsApiClient } from './api';
import {
    Accounts,
    Billing,
    Campaigns,
    CampaignRecipients,
    Coverage,
    Jobs,
    Licenses,
    Newsrooms,
    NewsroomCategories,
    NewsroomContacts,
    NewsroomLanguages,
    NewsroomThemes,
    NewsroomWebhooks,
    NewsroomPrivacyRequests,
    NewsroomDomains,
    NewsroomGalleries,
    SenderAddresses,
    Signup,
    Stories,
    Snippets,
    Subscriptions,
    NotificationSubscriptions,
} from './endpoints';
import type { HeadersMap } from './http';

const DEFAULT_BASE_URL = 'https://api.prezly.com';

export interface ClientOptions {
    accessToken: string;
    baseUrl?: string;
    headers?: HeadersMap;
}

export interface Client {
    accounts: Accounts.Client;
    billing: Billing.Client;
    campaigns: Campaigns.Client;
    campaignRecipients: CampaignRecipients.Client;
    coverage: Coverage.Client;
    jobs: Jobs.Client;
    licenses: Licenses.Client;
    newsrooms: Newsrooms.Client;
    newsroomCategories: NewsroomCategories.Client;
    newsroomContacts: NewsroomContacts.Client;
    newsroomLanguages: NewsroomLanguages.Client;
    newsroomThemes: NewsroomThemes.Client;
    newsroomWebhooks: NewsroomWebhooks.Client;
    newsroomPrivacyRequests: NewsroomPrivacyRequests.Client;
    newsroomDomains: NewsroomDomains.Client;
    newsroomGalleries: NewsroomGalleries.Client;
    senderAddresses: SenderAddresses.Client;
    signup: Signup.Client;
    stories: Stories.Client;
    snippets: Snippets.Client;
    subscriptions: Subscriptions.Client;
    notificationSubscriptions: NotificationSubscriptions.Client;
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
        accounts: new Accounts.Client(apiClient),
        billing: new Billing.Client(apiClient),
        campaigns: new Campaigns.Client(apiClient),
        campaignRecipients: new CampaignRecipients.Client(apiClient),
        coverage: new Coverage.Client(apiClient),
        jobs: new Jobs.Client(apiClient),
        licenses: new Licenses.Client(apiClient),
        newsrooms: new Newsrooms.Client(apiClient),
        newsroomCategories: new NewsroomCategories.Client(apiClient),
        newsroomContacts: new NewsroomContacts.Client(apiClient),
        newsroomLanguages: new NewsroomLanguages.Client(apiClient),
        newsroomThemes: new NewsroomThemes.Client(apiClient),
        newsroomWebhooks: new NewsroomWebhooks.Client(apiClient),
        newsroomPrivacyRequests: new NewsroomPrivacyRequests.Client(apiClient),
        newsroomDomains: new NewsroomDomains.Client(apiClient),
        newsroomGalleries: new NewsroomGalleries.Client(apiClient),
        senderAddresses: new SenderAddresses.Client(apiClient),
        signup: new Signup.Client(apiClient),
        stories: new Stories.Client(apiClient),
        snippets: new Snippets.Client(apiClient),
        subscriptions: new Subscriptions.Client(apiClient),
        notificationSubscriptions: new NotificationSubscriptions.Client(apiClient),
    };
}
