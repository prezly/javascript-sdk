import { PrivacyRequest } from '../../types';

export interface DeletePrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequest.Type.DELETE;
    message: string;
    extra_message?: string;
}

export interface ExportPrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequest.Type.EXPORT;
    message?: string;
    extra_message?: string;
}

export interface CorrectPrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequest.Type.CORRECT;
    message: string;
    extra_message: string;
}

export interface OtherPrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequest.Type.OTHER;
    message: string;
    extra_message?: string;
}
