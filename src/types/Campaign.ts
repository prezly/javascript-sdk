import type { NewsroomRef } from './Newsroom';
import type { SenderAddress } from './SenderAddress';
import { SenderDomain } from './SenderDomain';
import type { StoryRef } from './Story';
import type { UserRef } from './User';
import ClickTrackingVersion = Campaign.ClickTrackingVersion;

export interface Campaign {
    id: number;
    author: UserRef;
    lifecycle_status: Campaign.LifecycleStatus;
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
    story_alignment: Campaign.StoryAlignment;
    story_appearance: Campaign.StoryAppearance;

    // Sender address & domain
    sender: SenderAddress | null;
    sender_domain_verification_flow: SenderDomain.VerificationFlowVersion | null;
    sender_domain_verification_status: Campaign.SenderDomainVerificationStatus;

    created_at: string;
    updated_at: string;
    scheduled_at: string | null;
    sent_at: string | null;
    delivered_at: string | null;

    is_open_tracking_enabled: boolean;
    is_click_tracking_enabled: boolean;
    click_tracking_version: ClickTrackingVersion;

    recipients_number: number;
    stats: {
        bounces: number;
        clicks: number;
        clicks_rate: number;
        delivered: number;
        delivering: number;
        opens: number;
        opens_rate: number;
        skipped: number;
        undelivered: number;
        undelivered_rate: number;
        unsubscribes: number;
        unsubscribes_rate: number;
    };
}

export namespace Campaign {
    export type SenderDomainVerificationFlow = SenderDomain.VerificationFlowVersion;
    export const SenderDomainVerificationFlow = SenderDomain.VerificationFlowVersion;

    export enum LifecycleStatus {
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

    export enum ClickTrackingVersion {
        DEPRECATED = 1,
        ENHANCED = 2,
    }

    export function isDraft(status: LifecycleStatus): boolean;
    export function isDraft(campaign: Pick<Campaign, 'lifecycle_status'>): boolean;
    export function isDraft(arg: LifecycleStatus | Pick<Campaign, 'lifecycle_status'>): boolean {
        if (typeof arg === 'object') {
            return isDraft(arg.lifecycle_status);
        }
        return arg === LifecycleStatus.DRAFT;
    }

    export function isScheduled(status: LifecycleStatus): boolean;
    export function isScheduled(campaign: Pick<Campaign, 'lifecycle_status'>): boolean;
    export function isScheduled(
        arg: LifecycleStatus | Pick<Campaign, 'lifecycle_status'>,
    ): boolean {
        if (typeof arg === 'object') {
            return isScheduled(arg.lifecycle_status);
        }
        return arg === LifecycleStatus.SCHEDULED;
    }

    export function isPending(status: LifecycleStatus): boolean;
    export function isPending(campaign: Pick<Campaign, 'lifecycle_status'>): boolean;
    export function isPending(arg: LifecycleStatus | Pick<Campaign, 'lifecycle_status'>): boolean {
        if (typeof arg === 'object') {
            return isPending(arg.lifecycle_status);
        }
        return arg === LifecycleStatus.PENDING;
    }

    export function isSent(status: LifecycleStatus): boolean;
    export function isSent(campaign: Pick<Campaign, 'lifecycle_status'>): boolean;
    export function isSent(arg: LifecycleStatus | Pick<Campaign, 'lifecycle_status'>): boolean {
        if (typeof arg === 'object') {
            return isSent(arg.lifecycle_status);
        }
        return arg === LifecycleStatus.SENT;
    }
}
