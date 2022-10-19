import { Campaign, Contact, EmailRecipient, SelectionValue } from '../../types';

export interface AllContactsScope {
    type: 'scope:contacts';
    selection?: SelectionValue<Contact['id']>;
}

export interface ContactOrganisationsScope {
    type: 'scope:contact_organisations';
    contact_id: Contact['id'];
    selection?: SelectionValue<Contact['id']>;
}

export interface ContactEmployeesScope {
    type: 'scope:contact_organisations';
    contact_id: Contact['id'];
    selection?: SelectionValue<Contact['id']>;
}

export interface CampaignRecipientsScope {
    type: 'scope:campaign_recipients';
    campaign_id: Campaign['id'];
    selection?: SelectionValue<EmailRecipient['id']>;
}

export interface CampaignReportScope {
    type: 'scope:campaign_recipients';
    campaign_id: Campaign['id'];
    report:
        | 'recipients'
        | 'sent'
        | 'clicked'
        | 'opened'
        | 'unopened'
        | 'undelivered'
        | 'unsubscribed';
    selection?: SelectionValue<Contact['id']>;
}

export type ContactsScope =
    | AllContactsScope
    | ContactOrganisationsScope
    | ContactEmployeesScope
    | CampaignRecipientsScope
    | CampaignReportScope;
