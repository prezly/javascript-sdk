import { Options } from './types';
import { Coverage } from './Coverage';
import ApiClient from './ApiClient';

const BASE_URL = 'https://api.prezly.com';

export default class Sdk {
    public coverage: Coverage;

    constructor({ accessToken, baseUrl = BASE_URL, headers = {} }: Options) {
        const apiClient = new ApiClient({
            accessToken,
            baseUrl,
            headers,
        });

        this.coverage = new Coverage({
            apiClient,
        });
    }
}
