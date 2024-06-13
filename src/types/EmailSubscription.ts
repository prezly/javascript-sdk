import type { ContactRef } from './Contact';

export interface EmailSubscription {
    id: string;
    email_address: string;
    first_name: string | null;
    last_name: string | null;
    /**
     * This field will be present only if user has permission to view contacts.
     */
    contacts?: ContactRef[];
    is_demo: boolean;
}
