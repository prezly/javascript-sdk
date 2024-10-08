import type { UploadedImage } from '@prezly/uploads';

import type { ContactDuplicateSuggestionRef } from './ContactDuplicateSuggestion';
import type { ContactTagRef } from './ContactTag';

export interface ContactRef {
    id: number;
    contact_type: Contact.Type;
    display_name: string;
    function_name: string | null;
    avatar_url: string;
    is_deleted: boolean;
    links: {
        api: string;
        view: string | null;
    };
}

interface Language {
    code: string;
    direction: string;
    locale: string;
    name: string;
}

export interface Contact {
    id: number;
    contact_type: Contact.Type;
    is_deleted: boolean;
    is_person: boolean;
    is_demo: boolean;

    company_name: string;
    domain: string | null;
    first_name: string;
    last_name: string;

    display_name: string;
    avatar_url: string;
    avatar_image: UploadedImage | null;
    salutation: string;
    gender: Contact.Gender;
    periodicity: Contact.Periodicity | null;
    medium_types: Contact.MediumType[];
    bio: string;
    languages: Language[];

    primary_email: string | null;
    emails: string[];
    phone_numbers: Contact.PhoneNumber[];
    social: { type: Contact.SocialNetwork; username: string }[];
    function_name: string;
    address: {
        street: string;
        number: string;
        box: string;
        zip: string;
        city: string;
        region: string;
        country: string | null;
    };
    address_text: string;
    urls: string[];

    engagement_rating: {
        last_diff: number;
        stars: number;
    };

    coverage_number: number;
    last_coverage_at: string | null;

    organisations_number: number;
    organisations: ContactRef[];

    employees_number: number;
    tags: string[];
    tag_entities: ContactTagRef[];

    has_enrichments: boolean;
    is_bounced: boolean;
    is_duplicated: boolean;
    is_unsubscribed: boolean;
    is_unsubscribed_from_all_communications: boolean;
    is_spam_reported: boolean;
    unsubscribed_newsrooms: string[];
    duplicate_contacts: ContactDuplicateSuggestionRef[];

    last_contacted_at: string | null;

    created_at: string | null; // there are contacts in DB that do have `created_at = null`
    modified_at: string | null;

    external_metrics: {
        open_page_rank: number | null;
        similarweb_country: string | null;
        similarweb_country_rank: number | null;
        similarweb_global_rank: number | null;
        similarweb_visitors_monthly: number | null;
    };

    stats: {
        clicked: number;
        delivered: number;
        clicked_rate: number;
        opened: number;
        opened_rate: number;
        sent: number;
    };

    links: {
        api: string;
        convert: string;
        edit: string;
        employees_api: string;
        enrichments_api: string;
        export_personal_data_api: string;
        organisations_api: string;
        view: string;
    };

    enrichments: {
        languages: Language['code'][];
        medium_types: Contact.MediumType[];
        urls: string[];
        phone_numbers: Contact.PhoneNumber[];
        social: { type: Contact.SocialNetwork; username: string }[];
        periodicity: Contact.Periodicity | null;
        address: {
            street: string | null;
            number: string | null;
            box: string | null;
            zip: string | null;
            city: string | null;
            region: string | null;
            country: string | null;
        };
    };
}

export namespace Contact {
    export enum Type {
        PERSON = 'person',
        ORGANISATION = 'organisation',
    }

    export enum Gender {
        MALE = 'male',
        FEMALE = 'female',
        UNSPECIFIED = 'unspecified',
    }

    export enum Periodicity {
        DAILY = 'daily',
        WEEKDAYS = 'weekdays',
        WEEKLY = 'weekly',
        BI_WEEKLY = 'bi-weekly',
        MONTHLY = 'monthly',
        BI_MONTHLY = 'bi-monthly',
        QUARTERLY = 'quarterly',
        ANNUALLY = 'annually',
        BI_ANUALLY = 'bi-annually',
        SEMI_ANNUALLY = 'semi-annually',
    }

    export enum MediumType {
        WIRE = 'wire',
        PRINT = 'print',
        RADIO = 'radio',
        PHOTO = 'photo',
        NEWSPAPER = 'newspaper',
        MAGAZINE = 'magazine',
        TV = 'tv',
        BLOG = 'blog',
        VLOG = 'vlog',
        SOCIAL = 'social',
        WEB = 'web',
        ANALYST = 'analyst',
        EXPERT = 'expert',
        INFLUENCER = 'influencer',
        PODCAST = 'podcast',
        NEWSLETTER = 'newsletter',
        NEWS_SITE = 'news website',
    }

    export enum SocialNetwork {
        DISCORD = 'discord',
        FACEBOOK = 'facebook',
        INSTAGRAM = 'instagram',
        LINKEDIN = 'linkedin',
        PINTEREST = 'pinterest',
        SKYPE = 'skype',
        SNAPCHAT = 'snapchat',
        TIKTOK = 'tiktok',
        TWITCH = 'twitch',
        TWITTER = 'twitter',
        YOUTUBE = 'youtube',
    }

    export interface PhoneNumber {
        number: string;
        type: PhoneNumber.Type;
    }

    export namespace PhoneNumber {
        export enum Type {
            TELEPHONE = 'tel',
            CELLPHONE = 'cell',
        }
    }

    export function isPerson(contact: Pick<Contact, 'contact_type'>): boolean;
    export function isPerson(type: Contact['contact_type']): boolean;
    export function isPerson(
        arg: Contact['contact_type'] | Pick<Contact, 'contact_type'>,
    ): boolean {
        if (arg !== null && typeof arg === 'object') {
            return arg.contact_type === Type.PERSON;
        }
        return arg === Type.PERSON;
    }

    export function isOrganisation(contact: Pick<Contact, 'contact_type'>): boolean;
    export function isOrganisation(type: Contact['contact_type']): boolean;
    export function isOrganisation(
        arg: Contact['contact_type'] | Pick<Contact, 'contact_type'>,
    ): boolean {
        if (arg !== null && typeof arg === 'object') {
            return arg.contact_type === Type.ORGANISATION;
        }
        return arg === Type.ORGANISATION;
    }
}
