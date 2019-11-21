export default interface UserAccountRef {
    id: number;
    username: string;
    email: string;
    display_name: string;
    first_name: string | null;
    avatar_url: string;
    contact_url: string | null;
}
