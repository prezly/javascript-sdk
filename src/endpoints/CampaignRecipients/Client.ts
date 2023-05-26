import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Campaign, Contact, ContactsScope, EmailRecipient, QueryString } from '../../types';
import { Query, SortOrder } from '../../types';
import type { RecipientsOperationResponse } from '../Campaigns';

import type { ListOptions, ListResponse, SearchOptions } from './types';

type CampaignId = Campaign['id'];
type ContactId = Contact['id'];
type EmailRecipientId = EmailRecipient['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list(campaignId: CampaignId, options: ListOptions): Promise<ListResponse> {
        const { limit, offset, sortOrder } = options;
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return this.apiClient.get<ListResponse>(url, {
            query: {
                limit,
                offset,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async search(campaignId: CampaignId, options: SearchOptions): Promise<ListResponse> {
        const { limit, offset, sortOrder, query } = options;
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        // TODO: Introduce dedicated Search POST API
        return this.apiClient.get<ListResponse>(url, {
            query: {
                query: Query.stringify(query),
                sort: SortOrder.stringify(sortOrder),
                limit,
                offset,
            },
        });
    }

    async get(campaignId: CampaignId, recipientId: EmailRecipientId): Promise<EmailRecipient> {
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        const { recipient } = await this.apiClient.get<{ recipient: EmailRecipient }>(
            `${url}/${recipientId}`,
        );
        return recipient;
    }

    async addContact(
        campaignId: CampaignId,
        contact: { id: ContactId; emailAddress?: string },
    ): Promise<RecipientsOperationResponse> {
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return this.apiClient.post(url, {
            payload: { contact },
        });
    }

    async addContacts(
        campaignId: CampaignId,
        contacts: { query?: Query | QueryString; scope?: ContactsScope },
    ): Promise<RecipientsOperationResponse> {
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return this.apiClient.post(url, {
            payload: { contacts },
        });
    }

    async removeRecipient(
        campaignId: CampaignId,
        recipientId: EmailRecipientId,
    ): Promise<RecipientsOperationResponse> {
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return this.apiClient.delete<RecipientsOperationResponse>(`${url}/${recipientId}`);
    }

    async removeRecipients(
        campaignId: CampaignId,
        params?: { query: Query | QueryString },
    ): Promise<RecipientsOperationResponse> {
        const { query } = params || {};
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return this.apiClient.delete<RecipientsOperationResponse>(url, {
            payload: { query },
        });
    }
}
