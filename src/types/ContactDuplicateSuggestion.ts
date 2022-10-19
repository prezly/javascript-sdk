import type { ContactRef } from './Contact';

export interface ContactDuplicateSuggestion {
    contact: ContactRef;
    /**
     * Value in range 0.0 ... 1.0.
     */
    score: number;
    status: ContactDuplicateSuggestion.Status;
    links: {
        merge_api: string;
    };
}

export namespace ContactDuplicateSuggestion {
    export enum Status {
        UNSEEN = 'unseen',
        ACCEPTED = 'accepted',
        DECLINED = 'declined',
    }
}
