import type { DeferredJobsApiClient } from './api';
import { createApiClient, createDeferredJobsApiClient, type Fetch } from './api';
import {
    Accounts,
    Billing,
    NewsroomSubscriptions,
    Campaigns,
    CampaignRecipients,
    Contacts,
    ContactTags,
    ContactTagGroups,
    ContactsExports,
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
    NewsroomHub,
    PricingTables,
    SenderAddresses,
    Stories,
    Snippets,
    Subscriptions,
    NotificationSubscriptions,
    CoverageIntegrations,
} from './endpoints';
import type { HeadersMap } from './http';
import { createHttpClient } from './http';

const DEFAULT_BASE_URL = 'https://api.prezly.com';

export interface ClientOptions {
    accessToken: string;
    baseUrl?: string;
    headers?: HeadersMap;
    fetch?: Fetch;
}

export interface Client {
    api: DeferredJobsApiClient;
    accounts: Accounts.Client;
    billing: Billing.Client;
    campaigns: Campaigns.Client;
    campaignRecipients: CampaignRecipients.Client;
    contacts: Contacts.Client;
    contactTags: ContactTags.Client;
    contactTagGroups: ContactTagGroups.Client;
    contactsExports: ContactsExports.Client;
    coverage: Coverage.Client;
    coverageIntegrations: CoverageIntegrations.Client;
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
    newsroomHub: NewsroomHub.Client;
    newsroomSubscriptions: NewsroomSubscriptions.Client;
    pricingTables: PricingTables.Client;
    senderAddresses: SenderAddresses.Client;
    stories: Stories.Client;
    snippets: Snippets.Client;
    subscriptions: Subscriptions.Client;
    notificationSubscriptions: NotificationSubscriptions.Client;
}

export function createClient({
    accessToken,
    baseUrl = DEFAULT_BASE_URL,
    headers = {},
    fetch,
}: ClientOptions): Client {
    const http = createHttpClient({ fetch });
    const api = createDeferredJobsApiClient(
        http,
        createApiClient(http, {
            accessToken,
            baseUrl,
            headers,
        }),
    );

    return {
        api,
        accounts: Accounts.createClient(api),
        billing: Billing.createClient(api),
        campaigns: Campaigns.createClient(api),
        campaignRecipients: CampaignRecipients.createClient(api),
        contacts: Contacts.createClient(api),
        contactTags: ContactTags.createClient(api),
        contactTagGroups: ContactTagGroups.createClient(api),
        contactsExports: ContactsExports.createClient(api),
        coverage: Coverage.createClient(api),
        coverageIntegrations: CoverageIntegrations.createClient(api),
        jobs: Jobs.createClient(api),
        licenses: Licenses.createClient(api),
        newsrooms: Newsrooms.createClient(api),
        newsroomCategories: NewsroomCategories.createClient(api),
        newsroomContacts: NewsroomContacts.createClient(api),
        newsroomLanguages: NewsroomLanguages.createClient(api),
        newsroomThemes: NewsroomThemes.createClient(api),
        newsroomWebhooks: NewsroomWebhooks.createClient(api),
        newsroomPrivacyRequests: NewsroomPrivacyRequests.createClient(api),
        newsroomDomains: NewsroomDomains.createClient(api),
        newsroomGalleries: NewsroomGalleries.createClient(api),
        newsroomHub: NewsroomHub.createClient(api),
        newsroomSubscriptions: NewsroomSubscriptions.createClient(api),
        pricingTables: PricingTables.createClient(api),
        senderAddresses: SenderAddresses.createClient(api),
        stories: Stories.createClient(api),
        snippets: Snippets.createClient(api),
        subscriptions: Subscriptions.createClient(api),
        notificationSubscriptions: NotificationSubscriptions.createClient(api),
    };
}
