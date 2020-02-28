import Contact from './Contact';
import Entity from './Entity';
import Story from './Story';
import UserRef from './UserRef';
import RoomRef from './RoomRef';

export default interface Coverage extends Entity<number> {
    attachment: {
        cdnUrl: string;
        download_url: string;
        filename: string;
        isImage: boolean;
        mime_type: string;
        size: number;
        uuid: string;
        version: number;
    } | null;
    author_contact: Contact | null;
    headline: string;
    is_deleted: boolean;
    organisation_contact: Contact | null;
    newsroom: RoomRef | null;
    note_content_html: string;
    note_content_json: string;
    note_content_text: string;
    created_at: string;
    edited_at: string | null;
    published_at: string | null;
    story: Story | null;
    updated_at: string;
    url: string | null;
    user: UserRef;
    view_url: string;
}
