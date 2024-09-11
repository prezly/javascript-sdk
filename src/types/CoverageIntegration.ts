import type { CoverageEntry } from './CoverageEntry';
import type { CoverageIntegrationRun } from './CoverageIntegrationRun';
import type { NewsroomRef } from './Newsroom';
import type {UserRef} from "./User";

type Iso8601DateTime = string;

export interface CoverageIntegration {
    id: number;
    name: string;
    description: string | null;
    newsroom: NewsroomRef;
    provider: CoverageEntry.Provider;
    input: string;
    skip_author: boolean;
    skip_organisation: boolean;
    last_run: CoverageIntegrationRun | null;
    next_run_at: Iso8601DateTime;
    created_at: Iso8601DateTime;
    stats_added: number;
    creator: UserRef | null;
}
