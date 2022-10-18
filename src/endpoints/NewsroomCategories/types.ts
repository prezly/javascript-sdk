export interface NewsroomCategoriesListOptions {
    /**
     * Supported sort columns:
     * - `id`
     * - `display_name`
     * - `display_description`
     * - `stories_number`
     */
    sortOrder?: string;
}

export interface NewsroomCategoryCreateRequest {
    i18n: {
        [localCode: string]: {
            name: string;
            description?: string;
        };
    };
}

export interface NewsroomCategoryUpdateRequest {
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
