import Contact from '../Contact';
import { SelectionValue } from '../common';

export interface ContactEmployeesScope {
    type: 'scope:contact_organisations';
    contact_id: Contact['id'];
    selection?: SelectionValue<Contact['id']>;
}
