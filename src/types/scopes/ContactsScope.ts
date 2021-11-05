import { AllContactsScope } from './AllContactsScope';
import { ContactOrganisationsScope } from './ContactOrganisationsScope';
import { ContactEmployeesScope } from './ContactEmployeesScope';
import { CampaignRecipientsScope } from './CampaignRecipientsScope';
import { CampaignReportScope } from './CampaignReportScope';

export type ContactsScope =
    | AllContactsScope
    | ContactOrganisationsScope
    | ContactEmployeesScope
    | CampaignRecipientsScope
    | CampaignReportScope;
