import { UploadedFile } from '@prezly/uploads';

import { OEmbedInfo } from './common';
import { Contact } from './Contact';
import { Entity } from './Entity';
import { NewsroomRef } from './Newsroom';
import { Story } from './Story';
import { UserRef } from './User';
import { CountryRef } from './Country';
import { CultureRef } from './Culture';

export interface CoverageEntry extends Entity<number> {
    uuid: string;
    /**
     * @deprecated Please use `uuid` as identifier.
     * @see uuid
     */
    id: number;
    display_name: string;
    is_deleted: boolean;
    headline: string;
    user: UserRef;
    story: Story | null;
    newsroom: NewsroomRef | null;
    author_contact: Contact | null;
    organisation_contact: Contact | null;
    url: string | null;
    note_content_html: string;
    note_content_json: string;
    note_content_text: string;
    attachment: UploadedFile | null;
    attachment_oembed: OEmbedInfo | null;

    published_at: string | null;
    created_at: string;
    updated_at: string;
    edited_at: string | null;
    /**
     * @deprecated Please don't rely on this prop. It will be removed in future.
     */
    avatar_url: string | null;
    /**
     * @deprecated Please don't rely on this prop. It will be removed in future.
     */
    view_url: string;
    type: CoverageEntry.Type;
    country: CountryRef | null;
    culture: CultureRef | null;
    management_url: string | null;
    provider: CoverageEntry.Provider | null;
    fragment_duration: number | null;
    fragment_start_time: string | null;
    fragment_end_time: string | null;
    page: number | null;
}

export namespace CoverageEntry {
    export enum Type {
        ONLINE = 'online',
        SOCIAL = 'social',
        PRINT = 'print',
        RADIO = 'radio',
        TELEVISION = 'television',
    }

    export enum Provider {
        AMMCO = 'ammco',
        AUXIPRESS = 'auxipress',
        BELGA = 'belga',
        FEED = 'feed',
        KANTAR = 'kantar',
        KNEWIN = 'knewin',
        MEDIAWEB = 'mediaweb',
        MELTWATER = 'meltwater',
        MANUAL = 'manual',
    }
}
