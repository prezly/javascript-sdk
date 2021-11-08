import { SelectionValue } from '../common';
import { Contact } from '../Contact';

export interface AllContactsScope {
    type: 'scope:contacts';
    selection?: SelectionValue<Contact['id']>;
}
