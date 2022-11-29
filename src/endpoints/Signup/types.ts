export type EmailAvailability = 'available' | 'taken';

export interface CheckEmailAvailabilityResponse {
    result: {
        email: EmailAvailability;
    };
}
