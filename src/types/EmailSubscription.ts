import type { Entity } from './Entity';

export interface EmailSubscription extends Entity<string> {
    id: string;
    email_address: string;
}
