import type { Query } from './common';
import type { ContactsScope } from './ContactsScope';

export interface ContactsBulkSelector {
    scope?: ContactsScope;
    query?: Query;
}
