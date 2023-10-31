import { ProgressPromise } from '@prezly/progress-promise';

import type { ApiResponse, HttpClient, Params, ParamsWithPayload } from '../http';
import { HttpCodes, isDeferredJobResponse } from '../http';
import { routing } from '../routing';
import type { JobState } from '../types';
import { JobStatus } from '../types';

import type { ApiClient } from './ApiClient';
const JOB_STATUS_POLLING_INTERVAL = 2000; // ms

async function sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function handleDeferredJob<V = any, P = any>(
    http: HttpClient,
    request: Promise<ApiResponse<V>>,
): ProgressPromise<V, P> {
    const response = await request;

    if (response.status === HttpCodes.ACCEPTED && isDeferredJobResponse(response.payload)) {
        return new ProgressPromise<V, P>(async function (resolve, reject, progress) {
            do {
                const response = await http.get<{ job: JobState<V, P> }>(routing.jobsUrl, {
                    fetch,
                });
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
            } while (true); // eslint-disable-line no-constant-condition
        });
    }

    return ProgressPromise.resolve(response.payload);
}

export class DeferredJobsApiClient {
    private readonly http: HttpClient;
    private readonly api: ApiClient;

    constructor(httpClient: HttpClient, apiClient: ApiClient) {
        this.http = httpClient;
        this.api = apiClient;
    }

    public get<V = any, P = any>(
        endpointUri: string,
        { headers, query }: Params = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(this.http, this.api.get<V>(endpointUri, { headers, query }));
    }

    public post<V = any, P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(
            this.http,
            this.api.post<V>(endpointUri, { headers, payload, query }),
        );
    }

    public put<V = any, P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(
            this.http,
            this.api.put<V>(endpointUri, { headers, payload, query }),
        );
    }

    public patch<V = any, P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(
            this.http,
            this.api.patch<V>(endpointUri, { headers, payload, query }),
        );
    }

    public delete<V = any, P = any>(
        endpointUri: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(
            this.http,
            this.api.delete<V>(endpointUri, { headers, payload, query }),
        );
    }
}
