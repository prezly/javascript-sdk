import type { ContactTagGroupRef } from './ContactTagGroup';
import type { UserRef } from './User';

type Iso8601DateTime = string;

export interface ContactTagRef {
    id: number;
    name: string;
    group: ContactTagGroupRef | null;
}

export interface ContactTag {
    id: number;
    name: string;
    contacts_number: number;
    contacts_url: string;
    created_at: Iso8601DateTime | null; // May be null for older tags
    updated_at: Iso8601DateTime | null; // May be null for older tags
    creator: UserRef | null; // May be null for older tags
    last_updated_by_user: UserRef | null; // May be null for older tags
    is_demo: boolean;
    group: ContactTagGroupRef | null;
}

export namespace ContactTag {
    export type Identifier = ContactTag['id'] | ContactTag['name'];
}
