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

type Job<V, P> = {
    id: string;
    state: JobState<V, P>;
};

function handleDeferredJob<V = any, P = any>(
    api: ApiClient,
    request: Promise<ApiResponse<V>>,
): ProgressPromise<V, P> {
    return new ProgressPromise<V, P>(async (resolve, reject, update) => {
        const response = await request;

        if (response.status === HttpCodes.ACCEPTED && isDeferredJobResponse(response.payload)) {
            const id = response.payload.progress.id;
            do {
                const response = await api.get<{ job: Job<V, P> }>(`${routing.jobsUrl}/${id}`, {
                    fetch,
                });
                const state = response.payload.job.state;

                if (state.status === JobStatus.RESOLVED) {
                    resolve(state.value);
                    return;
                }
                if (state.status === JobStatus.REJECTED) {
                    reject(state.value);
                    return;
                }

                update(state.progress, state.value);

                await sleep(JOB_STATUS_POLLING_INTERVAL);
            } while (true); // eslint-disable-line no-constant-condition
        }

        resolve(response.payload);
    });
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
