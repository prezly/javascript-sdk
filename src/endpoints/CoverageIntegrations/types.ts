import type { PROVIDER } from '../../types';
import { type Newsroom } from '../../types';

export interface CreateRequest {
    newsroom: Newsroom['id'] | Newsroom['uuid'];
    provider: PROVIDER;
    input: string;
    name: string;
    description?: string;
    skip_author?: boolean;
    skip_organisation?: boolean;
}

export interface UpdateRequest {
    input?: string;
    name?: string;
    description?: string;
    skip_author?: boolean;
    skip_organisation?: boolean;
}
