import { Options } from './types';
import ApiClient from './ApiClient';
import { Coverage } from './Coverage';
import { Stories } from './Stories';

const BASE_URL = 'https://api.prezly.com';

export default class Sdk {
    public coverage: Coverage;
    public stories: Stories;

    constructor({ accessToken, baseUrl = BASE_URL, headers = {} }: Options) {
        const apiClient = new ApiClient({
            accessToken,
            baseUrl,
            headers,
        });

        this.coverage = new Coverage({ apiClient });
        this.stories = new Stories({ apiClient });
    }
}
