type Iso8601DateTime = string;

export enum Status {
    DONE = 'done',
    ERROR = 'error',
    RUNNING = 'running',
}

export interface CoverageIntegrationRun {
    id: number;
    uuid: string;
    created_at: Iso8601DateTime;
    updated_at: Iso8601DateTime;
    status: Status;
    /**
     * Following properties will be `null` when status = 'running'
     */
    stats_processed: number | null;
    stats_added: number | null;
}
