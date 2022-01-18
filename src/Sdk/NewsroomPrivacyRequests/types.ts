import { PrivacyRequestType } from '../../types';

export interface NewsroomPrivacyRequestCreateRequest {
    email: string;
    type: PrivacyRequestType;
    /**
     * Required for "delete", "correct" and "other"
     * privacy request types
     */
    message?: string;
    /**
     * Required for "correct" privacy request type
     */
    extra_message?: string;
}
