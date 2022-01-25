import { PrivacyRequestType } from '../../types';

export interface DeletePrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequestType;
    message: string;
    extra_message?: string;
}

export interface ExportPrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequestType;
    message?: string;
    extra_message?: string;
}

export interface CorrectPrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequestType;
    message: string;
    extra_message: string;
}

export interface OtherPrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequestType;
    message: string;
    extra_message?: string;
}
