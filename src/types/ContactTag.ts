export interface ContactTag {
    id: number;
    name: string;
    contacts_number: number;
    contacts_url: string;
}

export namespace ContactTag {
    export type Identifier = ContactTag['id'] | ContactTag['name'];
}
