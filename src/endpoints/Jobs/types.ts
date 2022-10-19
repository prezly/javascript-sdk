import { JobState } from '../../types';

export interface StatusResponse {
    job: {
        id: string;
        state: JobState;
    };
}
