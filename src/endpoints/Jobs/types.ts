import { JobState } from '../../types';

export interface JobStatusResponse {
    job: {
        id: string;
        state: JobState;
    };
}
