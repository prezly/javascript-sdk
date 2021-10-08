export enum JobStatus {
    PENDING = 'pending',
    RESOLVED = 'resolved',
    REJECTED = 'rejected',
}

export default interface JobState {
    status: JobStatus;
    /**
     * Integer between 0 and 100, inclusive.
     */
    progress: number;
    value: object | null;
}
