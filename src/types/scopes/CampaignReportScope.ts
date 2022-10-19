import { SelectionValue } from '../common';
import { Campaign } from '../Campaign';
import { Contact } from '../Contact';

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
