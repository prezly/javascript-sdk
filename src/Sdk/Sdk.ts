import { Options } from './types';
import ApiClient from './ApiClient';
import Coverage from './Coverage';
import Stories from './Stories';
import Newsrooms from './Newsrooms';
import NewsroomCategories from './NewsroomCategories';
import NewsroomContacts from './NewsroomContacts';
import NewsroomLanguages from './NewsroomLanguages';
import NewsroomThemes from './NewsroomThemes';
import NewsroomWebhooks from './NewsroomWebhooks';
import NewsroomDomains from './NewsroomDomains';
import SenderAddresses from './SenderAddresses';
import Subscriptions from './Subscriptions';
import Jobs from './Jobs';

const BASE_URL = 'https://api.prezly.com';

export default class Sdk {
    public coverage: Coverage;
    public jobs: Jobs;
    public newsrooms: Newsrooms;
    public newsroomCategories: NewsroomCategories;
    public newsroomContacts: NewsroomContacts;
    public newsroomLanguages: NewsroomLanguages;
    public newsroomThemes: NewsroomThemes;
    public newsroomWebhooks: NewsroomWebhooks;
    public newsroomDomains: NewsroomDomains;
    public senderAddresses: SenderAddresses;
    public stories: Stories;
    public subscriptions: Subscriptions;

    constructor({ accessToken, baseUrl = BASE_URL, headers = {} }: Options) {
        const apiClient = new ApiClient({
            accessToken,
            baseUrl,
            headers,
        });

        this.coverage = new Coverage({ apiClient });
        this.jobs = new Jobs({ apiClient });
        this.newsrooms = new Newsrooms({ apiClient });
        this.newsroomCategories = new NewsroomCategories({ apiClient });
        this.newsroomContacts = new NewsroomContacts({ apiClient });
        this.newsroomLanguages = new NewsroomLanguages({ apiClient });
        this.newsroomThemes = new NewsroomThemes({ apiClient });
        this.newsroomWebhooks = new NewsroomWebhooks({ apiClient });
        this.newsroomDomains = new NewsroomDomains({ apiClient });
        this.senderAddresses = new SenderAddresses({ apiClient });
        this.stories = new Stories({ apiClient });
        this.subscriptions = new Subscriptions({ apiClient });
    }
}
