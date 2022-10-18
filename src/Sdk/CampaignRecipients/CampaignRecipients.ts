import { Campaign, Contact, ContactsScope, EmailRecipient, Query } from '../../types';

import routing from '../routing';
import DeferredJobsApiClient from '../DeferredJobsApiClient';

import { CampaignsRecipientsListResponse, CampaignsRecipientsSearchOptions } from './types';
import { CampaignRecipientsOperationResponse } from '../Campaigns';

type CampaignId = Campaign['id'];
type ContactId = Contact['id'];
type EmailRecipientId = EmailRecipient['id'];

export default class CampaignRecipients {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    async list(
        campaignId: CampaignId,
        options: CampaignsRecipientsSearchOptions,
    ): Promise<CampaignsRecipientsListResponse> {
        const { jsonQuery, page, pageSize, sortOrder } = options;
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return this.apiClient.get<CampaignsRecipientsListResponse>(url, {
            query: {
                limit: pageSize,
                page,
                query: jsonQuery ? JSON.stringify(jsonQuery) : undefined,
                sort: sortOrder,
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
    ): Promise<CampaignRecipientsOperationResponse> {
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return this.apiClient.post(url, {
            payload: { contact },
        });
    }

    async addContacts(
        campaignId: CampaignId,
        contacts: { query?: Query; scope?: ContactsScope },
    ): Promise<CampaignRecipientsOperationResponse> {
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return this.apiClient.post(url, {
            payload: { contacts },
        });
    }

    async removeRecipient(
        campaignId: CampaignId,
        recipientId: EmailRecipientId,
    ): Promise<CampaignRecipientsOperationResponse> {
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return this.apiClient.delete<CampaignRecipientsOperationResponse>(`${url}/${recipientId}`);
    }

    async removeRecipients(
        campaignId: CampaignId,
        params?: { query: Query },
    ): Promise<CampaignRecipientsOperationResponse> {
        const { query } = params || {};
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return this.apiClient.delete<CampaignRecipientsOperationResponse>(url, {
            payload: { query },
        });
    }
}
