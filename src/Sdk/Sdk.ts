import { Options } from './types';
import ApiClient from './ApiClient';
import Coverage from './Coverage';
import Stories from './Stories';
import Newsrooms from './Newsrooms';
import NewsroomCategories from './NewsroomCategories';
import NewsroomContacts from './NewsroomContacts';

const BASE_URL = 'https://api.prezly.com';

export default class Sdk {
    public coverage: Coverage;
    public newsrooms: Newsrooms;
    public newsroomCategories: NewsroomCategories;
    public newsroomContacts: NewsroomContacts;
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
        this.stories = new Stories({ apiClient });
    }
}
