import { Options } from './types';
import { BASE_URL } from './routing';
import { Coverage } from './Coverage';

export default class Sdk {
    public coverage: Coverage;

    constructor({ accessToken, baseUrl = BASE_URL }: Options) {
        this.coverage = new Coverage({
            accessToken,
            baseUrl,
        });
    }
}
