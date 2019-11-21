import { Entity } from '../types';

export interface Options {
    accessToken: string;
    baseUrl: string;
}

export default class BaseSdk<T extends Entity<number | string>> {
    protected readonly accessToken: string;
    protected readonly url: string;

    constructor({ accessToken, baseUrl }: Options, sdkUrl: string) {
        this.accessToken = accessToken;
        this.url = `${baseUrl}/${sdkUrl}`;
    }

    protected getHeaders(): { [key: string]: string } {
        return {
            'x-access-token': this.accessToken,
        };
    }

    protected getUrlWithId(itemOrItemId: string | T): string {
        const itemId = typeof itemOrItemId === 'object' ? itemOrItemId.id : itemOrItemId;
        return `${this.url}/${itemId}`;
    }
}
