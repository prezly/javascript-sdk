export interface UploadcareFile {
    /**
     * File unique UUID
     */
    uuid: string;
    /**
     * Internal format version number
     */
    version: number;
    /**
     * Original uploaded filename
     */
    filename: string;
    /**
     * File mime type
     *
     * Example: "application/pdf"
     */
    mime_type: string;
    /**
     * File size in bytes
     */
    size: number;
}
