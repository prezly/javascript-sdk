export interface EmailSubscription {
    id: string;
    email_address: string;
    first_name: string | null;
    last_name: string | null;
    number_of_contacts: number;
}
