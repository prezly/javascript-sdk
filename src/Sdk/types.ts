import { HeadersMap } from '../Api';

export interface ClientOptions {
    accessToken: string;
    baseUrl?: string;
    headers?: HeadersMap;
}
