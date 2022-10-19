export interface PrivacyRequest {
    id: string;
    status: PrivacyRequest.Status;
    email: string;
}

export namespace PrivacyRequest {
    export enum Type {
        DELETE = 'delete',
        EXPORT = 'export',
        CORRECT = 'correct',
        OTHER = 'other',
    }

    export enum Status {
        UNCONFIRMED = 'unconfirmed',
        CONFIRMED = 'confirmed',
    }
}
