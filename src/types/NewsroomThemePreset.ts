import { UploadcareImage } from './common';

interface EditableSettings {
    additionalProperties: boolean;
    properties: Record<
        string,
        {
            enum?: (string | null)[];
            'prezly:feature'?: string;
            type: string | (string | null)[];
        }
    >;
    required: string[];
    type: string;
}

export interface NewsroomTheme {
    id: string;
    name: string;
    description: string;
    features: string[];
    preview_image: UploadcareImage | null;
    is_custom: boolean;
}

export default interface NewsroomThemePreset {
    theme: NewsroomTheme;
    editable_settings: EditableSettings;
    settings: Record<string, any>;
    is_active: boolean;
}
