import type { Iso8601DateTime } from './common';
import type { CoverageIntegrationRef } from './CoverageIntegration';

export interface CoverageIntegrationRun {
    id: number;
    uuid: string;
    created_at: Iso8601DateTime;
    updated_at: Iso8601DateTime;
    status: CoverageIntegrationRun.Status;
    /**
     * Following properties will be `null` when status = 'running'
     */
    stats_processed: number | null;
    stats_added: number | null;
    integration: CoverageIntegrationRef;
}

export namespace CoverageIntegrationRun {
    export enum Status {
        DONE = 'done',
        ERROR = 'error',
        RUNNING = 'running',
    }
}
