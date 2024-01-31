import type { CultureRef } from './Culture';
import type { EmailSubscription } from './EmailSubscription';

export interface NewsroomSubscription {
    subscriber: EmailSubscription;
    is_active: boolean;
    created_at: string;
    culture: CultureRef;
}
