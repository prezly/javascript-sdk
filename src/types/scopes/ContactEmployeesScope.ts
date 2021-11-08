import { SelectionValue } from '../common';
import { Contact } from '../Contact';

export interface ContactEmployeesScope {
    type: 'scope:contact_organisations';
    contact_id: Contact['id'];
    selection?: SelectionValue<Contact['id']>;
}
