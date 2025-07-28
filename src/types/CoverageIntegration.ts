import type { Iso8601DateTime } from './common';
import type { CoverageEntry } from './CoverageEntry';
import type { CoverageIntegrationRun } from './CoverageIntegrationRun';
import type { NewsroomRef } from './Newsroom';
import type { UserRef } from './User';

export interface CoverageIntegration {
    id: number;
    name: string;
    description: string | null;
    newsroom: NewsroomRef | null;
    provider: CoverageEntry.Provider;
    input: string;
    skip_author: boolean;
    skip_organisation: boolean;
    last_run: CoverageIntegrationRun | null;
    next_run_at: Iso8601DateTime;
    created_at: Iso8601DateTime;
    stats_added: number;
    creator: UserRef | null;
    status: CoverageIntegration.Status;
    trial_ends_at: Iso8601DateTime | null;
}

export interface CoverageIntegrationRef {
    id: number;
    name: string;
    status: CoverageIntegration.Status;
    trial_ends_at: Iso8601DateTime | null;
}

export namespace CoverageIntegration {
    export enum Status {
        ACTIVE = 'active',
        PAUSED = 'paused',
        TRIAL = 'trial',
        DELETED = 'deleted',
    }
}
