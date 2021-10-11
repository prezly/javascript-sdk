import { Contact, Coverage, NewsroomRef, OEmbedInfo, Pagination, Story } from '../../types';
import CoverageType from '../../types/CoverageType';
import CoverageProvider from '../../types/CoverageProvider';
import CultureRef from "../../types/CultureRef";
import CountryRef from "../../types/CountryRef";

export interface CoverageUpdateRequest {
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
    type?: CoverageType;
    culture?: CultureRef['code'] | null;
    country?: CountryRef['code'] | null;
    management_url?: string | null;
    provider?: CoverageProvider | null;
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

export interface CoverageCreateRequest extends CoverageUpdateRequest {}

export interface CoverageSearchOptions {
    includeDeleted?: boolean;
    jsonQuery?: string;
    page?: number;
    pageSize?: number;
    sortOrder?: string;
}

export interface CoverageListResponse {
    coverage: Coverage[];
    pagination: Pagination;
    sort: string;
}
