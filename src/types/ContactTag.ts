import type { UserRef } from './User';

type Iso8601DateTime = string;

export interface ContactTag {
    id: number;
    name: string;
    contacts_number: number;
    contacts_url: string;
    created_at: Iso8601DateTime | undefined; // May be undefined for older tags
    updated_at: Iso8601DateTime | undefined; // May be undefined for older tags
    creator: UserRef | undefined; // May be undefined for older tags
    last_updated_by_user: UserRef | undefined; // May be undefined for older tags
}

export namespace ContactTag {
    export type Identifier = ContactTag['id'] | ContactTag['name'];
}
