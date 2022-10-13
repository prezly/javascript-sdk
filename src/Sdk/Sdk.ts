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

const BASE_URL = 'https://api.prezly.com';

export default class Sdk {
    public accounts: Accounts;
    public campaigns: Campaigns;
    public campaignRecipients: CampaignRecipients;
    public coverage: Coverage;
    public jobs: Jobs;
    public licenses: Licenses;
    public newsrooms: Newsrooms;
    public newsroomCategories: NewsroomCategories;
    public newsroomContacts: NewsroomContacts;
    public newsroomLanguages: NewsroomLanguages;
    public newsroomThemes: NewsroomThemes;
    public newsroomWebhooks: NewsroomWebhooks;
    public newsroomPrivacyRequests: NewsroomPrivacyRequests;
    public newsroomDomains: NewsroomDomains;
    public newsroomGalleries: NewsroomGalleries;
    public senderAddresses: SenderAddresses;
    public stories: Stories;
    public snippets: Snippets;
    public subscriptions: Subscriptions;

    constructor({ accessToken, baseUrl = BASE_URL, headers = {} }: ClientOptions) {
        const apiClient = new DeferredJobsApiClient(
            new ApiClient({
                accessToken,
                baseUrl,
                headers,
            }),
        );

        this.accounts = new Accounts({ apiClient });
        this.campaigns = new Campaigns({ apiClient });
        this.campaignRecipients = new CampaignRecipients({ apiClient });
        this.coverage = new Coverage({ apiClient });
        this.jobs = new Jobs({ apiClient });
        this.licenses = new Licenses({ apiClient });
        this.newsrooms = new Newsrooms({ apiClient });
        this.newsroomCategories = new NewsroomCategories({ apiClient });
        this.newsroomContacts = new NewsroomContacts({ apiClient });
        this.newsroomLanguages = new NewsroomLanguages({ apiClient });
        this.newsroomThemes = new NewsroomThemes({ apiClient });
        this.newsroomWebhooks = new NewsroomWebhooks({ apiClient });
        this.newsroomPrivacyRequests = new NewsroomPrivacyRequests({ apiClient });
        this.newsroomDomains = new NewsroomDomains({ apiClient });
        this.newsroomGalleries = new NewsroomGalleries({ apiClient });
        this.senderAddresses = new SenderAddresses({ apiClient });
        this.stories = new Stories({ apiClient });
        this.snippets = new Snippets({ apiClient });
        this.subscriptions = new Subscriptions({ apiClient });
    }
}
