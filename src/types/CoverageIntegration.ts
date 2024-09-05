import type { CoverageIntegrationRun } from './CoverageIntegrationRun';
import type { NewsroomRef } from './Newsroom';

type Iso8601DateTime = string;

export enum PROVIDER {
    BELGA = 'belga',
    RSS = 'rss',
    AUXIPRESS = 'auxipress',
    GOOGLE_ALERTS = 'google_alerts',
}

export interface CoverageIntegration {
    id: number;
    name: string;
    description: string | null;
    newsroom: NewsroomRef;
    provider: PROVIDER;
    input: string;
    skip_author: boolean;
    skip_organisation: boolean;
    last_run: CoverageIntegrationRun | null;
    next_run_at: Iso8601DateTime;
    created_at: Iso8601DateTime;
}
