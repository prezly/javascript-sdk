import type {
    CultureRef,
    CountryRef,
    Contact,
    CoverageEntry,
    NewsroomRef,
    OEmbedInfo,
    Pagination,
    Story,
    Query,
    SortOrder,
} from '../../types';

export type Scope = { story: Story['id'] } | null;

export interface UpdateRequest {
    attachment_oembed?: OEmbedInfo | null;
    attachment_plaintext_content?: string | null;
    attachment?: string | null;
    author?: Contact['id'] | string | null;
    external_reference_id?: string;
    headline?: string;
    newsroom?: NewsroomRef['id'] | null;
    note_content?: string | { json: string } | { text: string };
    organisation?: Contact['id'] | string | null;
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
}

export interface CreateRequest extends UpdateRequest {}

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
