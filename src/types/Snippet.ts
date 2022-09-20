import {UserRef} from "./UserRef";

export interface Snippet {
    id: number;
    uuid: string;
    title: string;
    content: string;
    creator: UserRef | null;
    created_at: string;
}