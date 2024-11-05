import type {
    Contact,
    CountryRef,
    CoverageEntry,
    CoverageIntegrationRun,
    CultureRef,
    NewsroomRef,
    OEmbedInfo,
    Pagination,
    Query,
    SortOrder,
    Story,
} from '../../types';

export type Scope = { story: Story['id'] } | null;

type ContactPointer =
    | Contact['id']
    | Contact['display_name']
    | { id: Contact['id'] }
    | { name: Contact['display_name'] }
    | { name: Contact['display_name']; url: Contact['urls'][number] };

export interface UpdateRequest {
    attachment_oembed?: OEmbedInfo | null;
    attachment_plaintext_content?: string | null;
    attachment?: string | null;
    author?: ContactPointer | null;
    external_reference_id?: string;
    headline?: string;
    newsroom?: NewsroomRef['id'] | null;
    note_content?: string | { json: string } | { text: string };
    organisation?: ContactPointer | null;
    original_metadata_source?: string;
    published_at?: string | null;
    story?: Story['id'] | null;
    url?: string | null;
    /**
     * For now, it will be automatically calculated whenever not provided.
     * Automatic calculation will be dropped in future when it starts being
     * required in coverage create requests.
     */
    type?: CoverageEntry.Type;
    culture?: CultureRef['code'] | null;
    pdf_url?: string | null;
    country?: CountryRef['code'] | null;
    management_url?: string | null;
    provider?: CoverageEntry.Provider | null;
    /**
     * For tv/radio types. Fragment duration in seconds.
     */
    fragment_duration?: number | null;
    /**
     * For tv/radio types. Accepts ISO 8601 date format.
     */
    fragment_start_time?: string | null;
    /**
     * For tv/radio types. Accepts ISO 8601 date format.
     */
    fragment_end_time?: string | null;
    /**
     * For print type.
     */
    page?: number | null;
    sentiment?: CoverageEntry.Sentiment | null;
}

export interface CreateRequest extends UpdateRequest {
    integration_run?: CoverageIntegrationRun['id'] | CoverageIntegrationRun['uuid'];
}

export interface CreateOptions {
    enrich?: boolean;
}

export interface ListOptions {
    includeDeleted?: boolean;
    limit?: number;
    offset?: number;
    sortOrder?: SortOrder | string;
}

export interface SearchOptions extends ListOptions {
    query?: Query;
}

export interface ListResponse {
    coverage: CoverageEntry[];
    pagination: Pagination;
    sort: string;
}
