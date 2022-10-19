export interface CreateRequest {
    title: string;
    content: string;
}

export interface UpdateRequest {
    title?: string;
    content?: string;
}
