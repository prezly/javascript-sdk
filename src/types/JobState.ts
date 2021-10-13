export enum JobStatus {
    PENDING = 'pending',
    RESOLVED = 'resolved',
    REJECTED = 'rejected',
}

type JobState<V = object | null, P = object | null, E = object | null> =
    | {
          status: JobStatus.RESOLVED;
          progress: number;
          value: V;
      }
    | {
          status: JobStatus.PENDING;
          progress: number;
          value: P;
      }
    | {
          status: JobStatus.REJECTED;
          progress: number;
          value: E;
      };

export default JobState;
