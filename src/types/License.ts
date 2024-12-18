import type { Currency } from './Currency';
import type { PlanLevel, PlanReference } from './Plan';

export interface LicenseRef {
    id: number;
    display_name: string;
    is_operable: boolean;
    is_locked: boolean;
    is_sso_required: boolean;
    avatar_url: string;
    status: License.Status;
    subscription_status: License.SubscriptionStatus | null;
}

export interface License extends LicenseRef {
    company_type: License.CompanyType | null;

    billing_company_name: string;
    billing_contact: string;
    billing_contact_email: string;
    /**
     * Billing cycle in months. (e.g. 1, 3, 6, 12, 24 or 36)
     * If billing cycle info is not manually set
     * it will be null (no data about billing cycle).
     */
    billing_cycle: number | null;
    has_credit_card: boolean;
    /**
     * Date when subscription will be automatically canceled.
     */
    cancel_at: string | null;
    /**
     * Date when subscription cancellation was requested.
     */
    canceled_at: string | null;
    company_address: string;
    company_address_city: string;
    company_address_country: string;
    company_address_zip: string;
    created_at: string;
    /**
     * When there are no subscriptions yet, the currency is null (we do not set a default value).
     */
    currency: Currency | null;
    /**
     * Date when current subscription period/cycle will end.
     * At the end of this period, a new invoice will be created.
     */
    current_period_end: string | null;
    demo_content_created_at: string | null;
    demo_content_deleted_at: string | null;
    display_name: string;
    id: number;
    is_locked: boolean;
    is_operable: boolean;
    is_sso_required: boolean;
    avatar_url: string;
    /**
     * Limit of newsrooms included in current plan.
     */
    newsrooms_limit: number;
    number_of_active_newsrooms: number;
    /**
     * Plan level will be null in case
     * we do not have data about plan level.
     *
     * @deprecated Will be dropped in the future,
     * use "plan" instead.
     */
    plan_level: PlanLevel | null;
    plan: PlanReference | null;
    status: License.Status;
    subscription_lockout: boolean;
    is_auto_renew_enabled: boolean;
    /**
     * Tax rate percent as a full number. (e.g. 21)
     */
    tax_rate_percent: number;
    /**
     * Total price *after* applying the discounts in cents.
     */
    total_after_discount: number | null;
    /**
     * Total price *before* applying the discounts in cents.
     */
    total_before_discount: number | null;
    total_seats: number;
    type: License.Type;
    vat_nr: string;
    po_number: string | null;
    /**
     * A combination of a number and the interval type ("day", "week", "month", "year"), separated by "/".
     *
     * Examples:
     * - "100/day"
     * - "5000/week"
     * - "100000/month"
     * - "2000000/year"
     */
    send_emails_limit: string;
    sent_emails_in_period: number;

    coverage_integration_belga_limit: number | null;
    coverage_integration_google_alerts_limit: number | null;
    coverage_integration_rss_limit: number | null;
    coverage_integration_auxipress_limit: number | null;
    coverage_integration_opoint_limit: number | null;
}

export namespace License {
    export enum Type {
        FAVOUR = 'favour',
        FREE = 'free',
        PAID_AUTO = 'paid_auto',
        PAID_MANUAL = 'paid_manual',
        TRIAL = 'trial',
    }

    export enum Status {
        TRIAL = 'trial',
        ACTIVE = 'active',
        PAST_DUE = 'past_due',
        PAYMENT_COLLECTION_PAUSED = 'payment_collection_paused',
        INACTIVE = 'inactive',
        INCOMPLETE = 'incomplete',
        CANCELED = 'canceled',
        UNPAID = 'unpaid',
    }

    export enum SubscriptionStatus {
        TRIALING = 'trialing',
        EXPIRED = 'expired',
        ACTIVE = 'active',
        CANCELED = 'canceled',
    }

    export enum CompanyType {
        BRAND = 'brand',
        AGENCY = 'agency',
        INTERNAL = 'internal',
    }
}
