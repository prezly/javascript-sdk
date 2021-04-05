import Contact from './Contact';
import Entity from './Entity';
import { NewsroomRef } from './Newsroom';
import Story from './Story';
import UserRef from './UserRef';
import { UploadcareImageStoragePayload } from '@prezly/slate-types';
import { OEmbedInfo } from './common';

export default interface Coverage extends Entity<number> {
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
    attachment: UploadcareImageStoragePayload;
    attachment_oembed: OEmbedInfo | null;

    published_at: string | null;
    created_at: string;
    updated_at: string;
    edited_at: string | null;
    /**
     * @deprecated Please don't rely on this prop. It will be removed in future.
     */
    avatar_url: string;
    /**
     * @deprecated Please don't rely on this prop. It will be removed in future.
     */
    view_url: string;
}
