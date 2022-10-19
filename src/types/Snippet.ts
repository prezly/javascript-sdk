import { UserRef } from './User';

export interface Snippet {
    id: number;
    uuid: string;
    title: string;
    content: string;
    block_types: string[];
    creator: UserRef | null;
    last_modifying_user: UserRef | null;
    created_at: string;
    modified_at: string;
}
