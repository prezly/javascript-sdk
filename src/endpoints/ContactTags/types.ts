import type { ContactTag, ContactTagGroup, Query } from '../../types';
import type { SortOrder } from '../../types';

export interface ListOptions {
    sortOrder?: SortOrder | string;
}

export interface ListResponse {
    tags: ContactTag[];
}

export interface SearchOptions extends ListOptions {
    query?: Query;
}

export type SearchResponse = ListResponse;

export interface CreateRequest {
    name: string;
    group?: ContactTagGroup['id'] | null;
}

export interface CreateOptions {
    force?: boolean;
}

export interface CreateResponse {
    tag: ContactTag;
    deleted: ContactTag['id'][];
}

export interface UpdateRequest {
    name: string;
    group?: ContactTagGroup['id'] | null;
}

export interface UpdateOptions {
    force?: boolean;
}

export interface UpdateResponse {
    tag: ContactTag;
    deleted: ContactTag['id'][];
}

export interface MergeRequest {
    name: string;
    tags: ContactTag.Identifier[];
}

export interface MergeResponse {
    tag: ContactTag;
    deleted: ContactTag['id'][];
}
