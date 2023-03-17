import type { Contact, ContactRef } from './Contact';

/**
 * Value in range 0.0 ... 1.0.
 */
type Score = number;

export interface ContactDuplicateSuggestion {
    contact: Contact; // Note: Contact
    score: Score;
    status: ContactDuplicateSuggestion.Status;
    links: {
        merge_api: string;
    };
}

export interface ContactDuplicateSuggestionRef {
    contact: ContactRef; // Note: ContactRef
    score: Score;
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

    export function isUnseen(suggestion: Pick<ContactDuplicateSuggestion, 'status'>): boolean;
    export function isUnseen(status: ContactDuplicateSuggestion['status']): boolean;
    export function isUnseen(
        arg: Pick<ContactDuplicateSuggestion, 'status'> | ContactDuplicateSuggestion['status'],
    ): boolean {
        if (arg !== null && typeof arg === 'object') {
            return arg.status === Status.UNSEEN;
        }
        return arg === Status.UNSEEN;
    }

    export function isAccepted(suggestion: Pick<ContactDuplicateSuggestion, 'status'>): boolean;
    export function isAccepted(status: ContactDuplicateSuggestion['status']): boolean;
    export function isAccepted(
        arg: Pick<ContactDuplicateSuggestion, 'status'> | ContactDuplicateSuggestion['status'],
    ): boolean {
        if (arg !== null && typeof arg === 'object') {
            return arg.status === Status.ACCEPTED;
        }
        return arg === Status.ACCEPTED;
    }

    export function isDeclined(suggestion: Pick<ContactDuplicateSuggestion, 'status'>): boolean;
    export function isDeclined(status: ContactDuplicateSuggestion['status']): boolean;
    export function isDeclined(
        arg: Pick<ContactDuplicateSuggestion, 'status'> | ContactDuplicateSuggestion['status'],
    ): boolean {
        if (arg !== null && typeof arg === 'object') {
            return arg.status === Status.DECLINED;
        }
        return arg === Status.DECLINED;
    }
}
