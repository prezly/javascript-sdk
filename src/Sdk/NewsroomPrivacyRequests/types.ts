import { PrivacyRequestType } from '../../types';

export interface DeletePrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequestType.DELETE;
    message: string;
    extra_message?: string;
}

export interface ExportPrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequestType.EXPORT;
    message?: string;
    extra_message?: string;
}

export interface CorrectPrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequestType.CORRECT;
    message: string;
    extra_message: string;
}

export interface OtherPrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequestType.OTHER;
    message: string;
    extra_message?: string;
}
