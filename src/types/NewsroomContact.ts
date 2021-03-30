import Culture from './Culture';
import { UploadcareImage } from './common';

export default interface NewsroomContact {
    uuid: string;
    /**
     * @deprecated Please use `uuid` as identifier.
     * @see uuid
     */
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    mobile: string | null;
    company: string | null;
    description: string | null;
    website: string | null;
    twitter: string | null;
    facebook: string | null;
    avatar_image: UploadcareImage | null;
    /**
     * Featured contacts are listed on the newsroom homepage.
     */
    is_featured: boolean;
    /**
     * List of locales this contact can be displayed for.
     */
    display_locales: Culture[];
}
