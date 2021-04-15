import { UnsafeNewsroomUpdateErrorResponse } from './types';

export function isUnsafeNewsroomUpdateErrorResponse(
    value: any,
): value is UnsafeNewsroomUpdateErrorResponse {
    return (
        value &&
        value.status === 'error' &&
        value.code === 'unsafe' &&
        typeof value.message === 'string' &&
        value.errors &&
        value.errors[':global'] &&
        Array.isArray(value.errors[':global']) &&
        value.errors[':global'].every(
            (error) => error && typeof error.code === 'string' && typeof error.message === 'string',
        )
    );
}
