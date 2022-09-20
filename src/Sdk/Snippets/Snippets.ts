import DeferredJobsApiClient from '../DeferredJobsApiClient';
import routing from '../routing';

import { SnippetCreateRequest } from './types';
import { Snippet } from '../../types/Snippet';

export default class Snippets {
    private readonly apiClient: DeferredJobsApiClient;

    constructor({ apiClient }: { apiClient: DeferredJobsApiClient }) {
        this.apiClient = apiClient;
    }

    public async create(payload: SnippetCreateRequest): Promise<Snippet> {
        const url = routing.snippetsUrl;
        const { snippet } = await this.apiClient.post<{ snippet: Snippet }>(url, {
            payload,
        });
        return snippet;
    }
}
