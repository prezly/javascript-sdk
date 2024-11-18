import { ProgressPromise } from '@prezly/progress-promise';

import type { ApiResponse, Params, ParamsWithPayload } from '../http';
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
    api: ApiClient,
    request: Promise<ApiResponse<V>>,
): ProgressPromise<V, P> {
    const response = await request;

    if (response.status === HttpCodes.ACCEPTED && isDeferredJobResponse(response.payload)) {
        return new ProgressPromise<V, P>(async function (resolve, reject, progress) {
            do {
                const response = await api.get<{ job: JobState<V, P> }>(routing.jobsUrl, {
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

export type DeferredJobsApiClient = ReturnType<typeof createDeferredJobsApiClient>;

export function createDeferredJobsApiClient(api: ApiClient) {
    function get<V = any, P = any>(
        url: string,
        { headers, query }: Params = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(api, api.get<V>(url, { headers, query }));
    }

    function post<V = any, P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(api, api.post<V>(url, { headers, payload, query }));
    }

    function put<V = any, P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(api, api.put<V>(url, { headers, payload, query }));
    }

    function patch<V = any, P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(api, api.patch<V>(url, { headers, payload, query }));
    }

    function doDelete<V = any, P = any>(
        url: string,
        { headers, payload, query }: ParamsWithPayload = {},
    ): ProgressPromise<V, P> {
        return handleDeferredJob<V, P>(api, api.delete<V>(url, { headers, payload, query }));
    }

    return {
        get,
        post,
        put,
        patch,
        delete: doDelete,
    };
}
