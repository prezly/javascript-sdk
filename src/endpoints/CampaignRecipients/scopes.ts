import type { Campaign, Contact, EmailRecipient, SelectionValue } from '../../types';

export interface AllContactsScope {
    type: ContactsScope.Type.ALL_CONTACTS;
    selection?: SelectionValue<Contact['id']>;
}

export interface ContactOrganisationsScope {
    type: ContactsScope.Type.CONTACT_ORGANISATIONS;
    contact_id: Contact['id'];
    selection?: SelectionValue<Contact['id']>;
}

export interface ContactEmployeesScope {
    type: ContactsScope.Type.CONTACT_EMPLOYEES;
    contact_id: Contact['id'];
    selection?: SelectionValue<Contact['id']>;
}

export interface CampaignRecipientsScope {
    type: ContactsScope.Type.CAMPAIGN_RECIPIENTS;
    campaign_id: Campaign['id'];
    selection?: SelectionValue<EmailRecipient['id']>;
}

export interface CampaignReportScope {
    type: ContactsScope.Type.CAMPAIGN_REPORT;
    campaign_id: Campaign['id'];
    report:
        | 'recipients'
        | 'sent'
        | 'clicked'
        | 'opened'
        | 'unopened'
        | 'undelivered'
        | 'unsubscribed';
    selection?: SelectionValue<EmailRecipient['id']>;
}

export type ContactsScope =
    | AllContactsScope
    | ContactOrganisationsScope
    | ContactEmployeesScope
    | CampaignRecipientsScope
    | CampaignReportScope;

export namespace ContactsScope {
    export enum Type {
        ALL_CONTACTS = 'scope:contacts',
        CONTACT_EMPLOYEES = 'scope:contact_employees',
        CONTACT_ORGANISATIONS = 'scope:contact_organisations',
        CAMPAIGN_RECIPIENTS = 'scope:campaign_recipients',
        CAMPAIGN_REPORT = 'scope:campaign_report',
    }
}
