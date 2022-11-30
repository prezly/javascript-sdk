export enum EmailAvailability {
    AVAILABLE = 'available',
    TAKEN = 'taken',
}

export interface CheckEmailAvailabilityResponse {
    result: {
        email: EmailAvailability;
    };
}
