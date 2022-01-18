export enum PrivacyRequestStatus {
    UNCONFIRMED = 'unconfirmed',
    CONFIRMED = 'confirmed',
}

export enum PrivacyRequestType {
    DELETE = 'delete',
    EXPORT = 'export',
    CORRECT = 'correct',
    OTHER = 'other',
}

export interface PrivacyRequest {
    id: string;
    status: PrivacyRequestStatus;
    email: string;
}
