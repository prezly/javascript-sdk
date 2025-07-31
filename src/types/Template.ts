import type { UserRef } from './User';

export interface Template {
    id: string;
    title: string;
    content: string;
    creator: UserRef | null;
    last_modifying_user: UserRef | null;
    created_at: string;
    modified_at: string;
}
