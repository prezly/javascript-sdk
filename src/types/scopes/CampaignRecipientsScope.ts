import Campaign from '../Campaign';
import { SelectionValue } from '../common';
import { EmailRecipient } from '../EmailRecipient';

export interface CampaignRecipientsScope {
    type: 'scope:campaign_recipients';
    campaign_id: Campaign['id'];
    selection?: SelectionValue<EmailRecipient['id']>;
}
