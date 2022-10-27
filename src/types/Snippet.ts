import type { Entity } from './Entity';
import type { UserRef } from './User';

export interface Snippet extends Entity<number> {
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
