import { UploadedFile } from './UploadedFile';

export interface UploadedImage extends UploadedFile {
    /**
     * Original image width in pixels (before transformations applied).
     */
    original_width: number;
    /**
     * Original image height in pixels (before transformations applied).
     */
    original_height: number;
    /**
     * Array of transformations to apply.
     *
     * Example: ["/preview/", "/resize/800x520/", "/contrast/25/"]
     */
    effects: string[];
}
