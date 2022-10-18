export interface SnippetCreateRequest {
    title: string;
    content: string;
}

export interface SnippetUpdateRequest {
    title?: string;
    content?: string;
}
