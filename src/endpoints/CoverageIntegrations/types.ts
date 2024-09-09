import { CoverageEntry, type Newsroom } from '../../types';

import Provider = CoverageEntry.Provider;

export interface CreateRequest {
    newsroom: Newsroom['id'] | Newsroom['uuid'];
    provider: Provider;
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
