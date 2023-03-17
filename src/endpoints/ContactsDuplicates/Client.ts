import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Contact, ContactDuplicateSuggestion } from '../../types';

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list(contactId: Contact['id']): Promise<ContactDuplicateSuggestion[]> {
        const url = routing.contactDuplicatesUrl.replace(':contact_id', String(contactId));

        const { duplicates } = await this.apiClient.get<{
            duplicates: ContactDuplicateSuggestion[];
        }>(url);

        return duplicates;
    }

    async decline(
        contactId: Contact['id'],
        duplicateId: ContactDuplicateSuggestion['contact']['id'],
    ): Promise<ContactDuplicateSuggestion[]> {
        const url = routing.contactDuplicatesUrl.replace(':contact_id', String(contactId));

        const { duplicates } = await this.apiClient.delete<{
            duplicates: ContactDuplicateSuggestion[];
        }>(`${url}/${duplicateId}`);

        return duplicates;
    }
}
