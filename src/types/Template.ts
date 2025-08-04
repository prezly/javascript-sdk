import type { Iso8601DateTime } from './common';
import type { UserRef } from './User';

export interface Template {
    id: string;
    title: string;
    creator: UserRef | null;
    last_modifying_user: UserRef | null;
    created_at: Iso8601DateTime;
    modified_at: Iso8601DateTime;
}

export interface ExtendedTemplate extends Template {
    content: string;
}
