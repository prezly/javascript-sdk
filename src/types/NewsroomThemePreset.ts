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
    description: string;
    features: string[];
    id: string;
    is_custom: boolean;
    name: string;
    preview_image: UploadcareImage | null;
}

export default interface NewsroomThemePreset {
    theme: NewsroomTheme;
    editable_settings: EditableSettings;
    settings: Record<string, any>;
    is_active: boolean;
}
