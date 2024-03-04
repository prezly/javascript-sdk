import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Campaign, Contact, ContactsScope, EmailRecipient } from '../../types';
import { Query, SortOrder } from '../../types';
import type { RecipientsOperationResponse } from '../Campaigns';

import type { ListOptions, ListResponse, SearchOptions } from './types';

type CampaignId = Campaign['id'];
type ContactId = Contact['id'];
type EmailRecipientId = EmailRecipient['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(campaignId: CampaignId, options: ListOptions): Promise<ListResponse> {
        const { limit, offset, sortOrder } = options;
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return api.get<ListResponse>(url, {
            query: {
                limit,
                offset,
                sort: SortOrder.stringify(sortOrder),
            },
        });
    }

    async function search(campaignId: CampaignId, options: SearchOptions): Promise<ListResponse> {
        const { limit, offset, sortOrder, query } = options;
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        // TODO: Introduce dedicated Search POST API
        return api.get<ListResponse>(url, {
            query: {
                query: Query.stringify(query),
                sort: SortOrder.stringify(sortOrder),
                limit,
                offset,
            },
        });
    }

    async function get(
        campaignId: CampaignId,
        recipientId: EmailRecipientId,
    ): Promise<EmailRecipient> {
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        const { recipient } = await api.get<{ recipient: EmailRecipient }>(`${url}/${recipientId}`);
        return recipient;
    }

    async function addContact(
        campaignId: CampaignId,
        contact: { id: ContactId; emailAddress?: string },
    ): Promise<RecipientsOperationResponse> {
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return api.post(url, {
            payload: { contact },
        });
    }

    async function addContacts(
        campaignId: CampaignId,
        contacts: { query?: Query; scope?: ContactsScope },
    ): Promise<RecipientsOperationResponse> {
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return api.post(url, {
            payload: { contacts },
        });
    }

    async function removeRecipient(
        campaignId: CampaignId,
        recipientId: EmailRecipientId,
    ): Promise<RecipientsOperationResponse> {
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return api.delete<RecipientsOperationResponse>(`${url}/${recipientId}`);
    }

    async function removeRecipients(
        campaignId: CampaignId,
        params?: { query: Query },
    ): Promise<RecipientsOperationResponse> {
        const { query } = params || {};
        const url = routing.campaignRecipientsUrl.replace(':campaign_id', String(campaignId));
        return api.delete<RecipientsOperationResponse>(url, {
            payload: { query },
        });
    }

    return {
        list,
        search,
        get,
        addContact,
        addContacts,
        removeRecipient,
        removeRecipients,
    };
}
