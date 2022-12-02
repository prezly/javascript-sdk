import type { UserRef } from './User';

type Iso8601DateTime = string;

export interface ContactsExport {
    uuid: string;
    status: ContactsExport.Status;
    contacts_count: number;
    user: UserRef;
    created_at: Iso8601DateTime;
    updated_at: Iso8601DateTime;
}

export namespace ContactsExport {
    export enum Status {
        NEW = 'new',
        DONE = 'done',
        FAILED = 'failed',
    }
}
