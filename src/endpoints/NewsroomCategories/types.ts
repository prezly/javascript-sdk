import type { SortOrder } from '../../types';

import type { UploadedImage } from '@prezly/uploads';

export interface ListOptions {
    /**
     * Supported sort columns:
     * - `id`
     * - `display_name`
     * - `display_description`
     * - `stories_number`
     */
    sortOrder?: SortOrder | string;
}

export interface CreateRequest {
    i18n: {
        [localCode: string]: {
            name: string;
            description?: string;
        };
    };
    image?: UploadedImage | null;
    is_featured?: boolean;
}

export interface UpdateRequest {
    i18n?: {
        /**
         * Pass `null` to erase category translation.
         */
        [localCode: string]: null | {
            name: string;
            description?: string;
        };
    };
    image?: UploadedImage | null;
    is_featured?: boolean;
}
