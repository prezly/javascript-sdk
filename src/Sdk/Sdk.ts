import { Options } from './types';
import ApiClient from './ApiClient';
import Coverage from './Coverage';
import Stories from './Stories';
import Newsrooms from './Newsrooms';
import NewsroomCategories from './NewsroomCategories';
import NewsroomContacts from './NewsroomContacts';
import NewsroomLanguages from './NewsroomLanguages';
import NewsroomWebhooks from './NewsroomWebhooks';
import NewsroomDomains from './NewsroomDomains';

const BASE_URL = 'https://api.prezly.com';

export default class Sdk {
    public coverage: Coverage;
    public newsrooms: Newsrooms;
    public newsroomCategories: NewsroomCategories;
    public newsroomContacts: NewsroomContacts;
    public newsroomLanguages: NewsroomLanguages;
    public newsroomWebhooks: NewsroomWebhooks;
    public newsroomDomains: NewsroomDomains;
    public stories: Stories;

    constructor({ accessToken, baseUrl = BASE_URL, headers = {} }: Options) {
        const apiClient = new ApiClient({
            accessToken,
            baseUrl,
            headers,
        });

        this.coverage = new Coverage({ apiClient });
        this.newsrooms = new Newsrooms({ apiClient });
        this.newsroomCategories = new NewsroomCategories({ apiClient });
        this.newsroomContacts = new NewsroomContacts({ apiClient });
        this.newsroomLanguages = new NewsroomLanguages({ apiClient });
        this.newsroomWebhooks = new NewsroomWebhooks({ apiClient });
        this.newsroomDomains = new NewsroomDomains({ apiClient });
        this.stories = new Stories({ apiClient });
    }
}
