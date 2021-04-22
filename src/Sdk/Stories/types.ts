import {
    Category,
    Culture,
    ExtraStoryFields,
    NewsroomRef,
    Pagination,
    Story,
    StoryFormatVersion,
    StoryVisibility,
} from '../../types';

/**
 * @see https://github.com/microsoft/TypeScript/issues/13298#issuecomment-707364842
 */
type UnionToTuple<T> = ((T extends any
  ? (t: T) => T
  : never) extends infer U
  ? (U extends any
      ? (u: U) => any
      : never) extends (v: infer V) => any
      ? V
      : never
  : never) extends (_: any) => infer W
    ? [...UnionToTuple<Exclude<T, W>>, W]
    : [];

export type StoriesSearchRequest<I extends keyof ExtraStoryFields = never> = {
    jsonQuery?: string;
    limit?: number;
    offset?: number;
    sortOrder?: string;
} & ([I] extends [never] // Note: [I] extends [never] is required (see https://stackoverflow.com/a/65492934)
    ? {
          include?: never;
      }
    : {
          include: UnionToTuple<I>;
      });

export type StoriesListRequest<I extends keyof ExtraStoryFields = never> = Omit<
    StoriesSearchRequest<I>,
    'jsonQuery'
>;

export interface StoriesListResponse<S extends Story = Story> {
    stories: S[];
    pagination: Pagination;
    sort: string;
}

interface GenericStoryCreateRequest {
    newsroom?: NewsroomRef['id'];
    culture?: Culture['code'];
    categories?: Category['id'][];
    tags?: string[];

    title?: string;
    subtitle?: string;
    /**
     * Uploadcare image JSON string.
     */
    header_image?: string;
    /**
     * Uploadcare image JSON string.
     */
    preview_image?: string;
    /**
     * Uploadcare image JSON string.
     */
    social_image?: string;
    social_text?: string;
    visibility?: StoryVisibility;
    /**
     * ISO 8601 formatted datetime string.
     */
    published_at?: string;
}

export interface HtmlStoryCreateRequest extends GenericStoryCreateRequest {
    /**
     * If field is omitted, license default editor version will be implied.
     */
    format_version?: StoryFormatVersion.HTML;
    /**
     * Intro field is only supported for HTML stories.
     */
    intro: string;
    /**
     * Content HTML string.
     */
    content: string;
}

export interface SlateStoryCreateRequest extends GenericStoryCreateRequest {
    /**
     * If field is omitted, license default editor version will be implied.
     */
    format_version?: StoryFormatVersion.SLATEJS;
    /**
     * Intro field is not supported for Slate stories.
     */
    intro: never;
    /**
     * Content JSON string.
     */
    content: string;
}

export type StoryCreateRequest = HtmlStoryCreateRequest | SlateStoryCreateRequest;
