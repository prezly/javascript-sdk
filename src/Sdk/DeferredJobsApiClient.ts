import { ProgressPromise } from '@prezly/progress-promise';

import {
    Http,
    ApiResponse,
    HttpCodes,
    isDeferredJobResponse,
    Params,
    ParamsWithPayload,
} from '../http';

import ApiClient from './ApiClient';
import { JobState, JobStatus } from '../types';

import routing from './routing';

const JOB_STATUS_POLLING_INTERVAL = 2000; // ms

async function sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function handleDeferredJob<V = any, P = any>(
    request: Promise<ApiResponse<V>>,
): ProgressPromise<V, P> {
    const response = await request;

    if (response.status === HttpCodes.ACCEPTED && isDeferredJobResponse(response.payload)) {
        return new ProgressPromise<V, P>(async function (resolve, reject, progress) {
            do {
                const response = await Http.get<{ job: JobState<V, P> }>(routing.jobsUrl);
                const { job } = response.payload;

                if (job.status === JobStatus.RESOLVED) {
                    resolve(job.value);
                    return;
                }
                if (job.status === JobStatus.REJECTED) {
                    reject(job.value);
                    return;
                }

                progress(job.progress, job.value);

                await sleep(JOB_STATUS_POLLING_INTERVAL);
            } while (true);
        });
    }

    return ProgressPromise.resolve(response.payload);
}

export default class DeferredJobsApiClient {
    private readonly apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    public get<V = any, P = any>(
        endpointUri: string,
        { headers, query }: Params = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(this.apiClient.get<V>(endpointUri, { headers, query }));
    }

    public post<V = any, P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(
            this.apiClient.post<V>(endpointUri, { headers, payload, query }),
        );
    }

    public put<V = any, P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(
            this.apiClient.put<V>(endpointUri, { headers, payload, query }),
        );
    }

    public patch<V = any, P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(
            this.apiClient.patch<V>(endpointUri, { headers, payload, query }),
        );
    }

    public delete<V = any, P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(
            this.apiClient.delete<V>(endpointUri, { headers, payload, query }),
        );
    }
}
