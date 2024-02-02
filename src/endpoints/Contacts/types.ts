import type { Contact, Pagination, Query } from '../../types';
import type { SortOrder } from '../../types';

// Convenience shortcuts
export type { ContactsBulkSelector as BulkSelector, ContactsScope as Scope } from '../../types';

export interface ListOptions {
    limit?: number;
    offset?: number;
    sortOrder?: SortOrder | string;
}

export interface SearchOptions extends ListOptions {
    query?: Query;
}

export interface ListResponse {
    contacts: Contact[];
    pagination: Pagination;
    sortOrder: SortOrder;
}

export type SearchResponse = ListResponse;

export type CreateRequest = OrganisationCreateRequest | PersonCreateRequest;
export type UpdateRequest = OrganisationUpdateRequest | PersonUpdateRequest;

interface BaseContactPayload {
    avatar_image?: string | null;
    languages?: string[];
    emails?: string[];
    phone_numbers?: Contact.PhoneNumber[];
    urls?: string[];
    social_accounts?: { type: Contact.SocialNetwork; username: string }[];
    tags?: (number | string)[];
    periodicity?: Contact.Periodicity | null;
    medium_types?: Contact.MediumType[];
    salutation?: string;
    address?: {
        street?: string;
        zip?: string;
        city?: string;
        region?: string;
        country?: string | null;
    };
}
export interface OrganisationUpdateRequest extends BaseContactPayload {
    company_name?: string;
}

export interface OrganisationCreateRequest extends BaseContactPayload {
    contact_type: `${Contact.Type.ORGANISATION}`;
    company_name: string;
}

export interface PersonUpdateRequest extends BaseContactPayload {
    first_name?: string;
    last_name?: string;
    gender?: Contact.Gender;
    function_name?: string;
    organisations?: (number | string)[];
}

export interface PersonCreateRequest extends PersonUpdateRequest {
    contact_type: `${Contact.Type.PERSON}`;
    /**
     * UUID of a subscriber.
     * If this property is provided, subscriber's data will be applied to the created contact.
     */
    subscriber?: string;
}

export interface BulkDeleteResponse {
    deleted_contacts_count: number;
}
