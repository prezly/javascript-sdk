/**
 * @see sfGuardUser::toApiReferenceArray()
 */
export default interface UserRef {
    id: number;
    username: string;
    display_name: string;
    first_name: string | null;
    contact_url: string | null;
}
