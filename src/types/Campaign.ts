import { NewsroomRef } from './Newsroom';
import { SenderAddress } from './SenderAddress';
import { SenderDomainVerificationFlowVersion } from './SenderDomain';
import { StoryRef } from './Story';
import { UserRef } from './UserRef';

export enum CampaignLifecycleStatus {
    DRAFT = 'draft',
    SCHEDULED = 'scheduled',
    PENDING = 'pending',
    SENT = 'sent',
}

export enum StoryAlignment {
    CENTER = 'center',
    LEFT = 'left',
    RIGHT = 'right',
}

export enum StoryAppearance {
    INTRO = 'intro',
    FULL = 'full',
}

export enum SenderDomainVerificationStatus {
    UNKNOWN = 'unknown',
    VALID = 'valid',
    INVALID = 'invalid',
    NOT_APPLICABLE = 'not-applicable',
}

export interface Campaign {
    id: number;
    author: UserRef;
    lifecycle_status: CampaignLifecycleStatus;
    subject: string;
    /**
     * JSON-serialized document in Prezly Content Format
     * @see https://developers.prezly.com/docs/api/docs/07-prezly-content-format.md
     */
    content: string;
    thumbnail_url: string;

    // Attached story
    story: StoryRef | null;
    newsroom: NewsroomRef | null;
    story_alignment: StoryAlignment;
    story_appearance: StoryAppearance;

    // Sender address & domain
    sender: SenderAddress | null;
    sender_domain_verification_flow: SenderDomainVerificationFlowVersion | null;
    sender_domain_verification_status: SenderDomainVerificationStatus;

    created_at: string;
    updated_at: string;
    scheduled_at: string | null;
    sent_at: string | null;
    delivered_at: string | null;

    recipients_number: number;
    stats: {
        bounces: number;
        clicks: number;
        clicks_rate: number;
        delivered: number;
        opens: number;
        opens_rate: number;
        undelivered_rate: number;
        unsubscribes: number;
        unsubscribes_rate: number;
    };
}
