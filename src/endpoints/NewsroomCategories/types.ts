export interface ListOptions {
    /**
     * Supported sort columns:
     * - `id`
     * - `display_name`
     * - `display_description`
     * - `stories_number`
     */
    sortOrder?: string;
}

export interface CreateRequest {
    i18n: {
        [localCode: string]: {
            name: string;
            description?: string;
        };
    };
}

export interface UpdateRequest {
    i18n: {
        /**
         * Pass `null` to erase category translation.
         */
        [localCode: string]: null | {
            name: string;
            description?: string;
        };
    };
}
