import { Entity } from './EntitiesMap';

export default interface ContactRef extends Entity {
    contact_type: 'person' | 'organisation';
    display_name: string;
    function_name: string | null;
    avatar_url: string;
    is_deleted: boolean;
    links: {
        api: string;
        view: string | null;
    };
}
