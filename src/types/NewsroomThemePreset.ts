import { UploadcareImage } from './common';
import { ThemeFeature } from './ThemeFeature';
import { EmailBranding } from './EmailBranding';

interface JsonSchema {
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
    features: ThemeFeature[];
    id: string;
    is_custom: boolean;
    name: string;
    preview_image: UploadcareImage | null;
}

export interface NewsroomThemePreset {
    theme: NewsroomTheme;
    editable_settings: JsonSchema;
    settings: Record<string, any>;
    is_active: boolean;
    email_branding: EmailBranding;
}
