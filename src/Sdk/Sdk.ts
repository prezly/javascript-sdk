import { Options } from './types';
import { Coverage } from './Coverage';

export const BASE_URL = 'https://api.prezly.com';

export default class Sdk {
    public coverage: Coverage;

    constructor({ accessToken, baseUrl = BASE_URL }: Options) {
        this.coverage = new Coverage({
            accessToken,
            baseUrl,
        });
    }
}
