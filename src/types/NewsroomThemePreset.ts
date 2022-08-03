import { UploadedImage } from '@prezly/uploads';

import { ThemeFeature } from './ThemeFeature';
import { EmailBranding } from './EmailBranding';
import { ThemeStatus } from './ThemeStatus';

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
    codename: string;
    description: string;
    use_case: string | null;
    features: ThemeFeature[];
    id: string;
    is_custom: boolean;
    is_legacy: boolean;
    name: string;
    preview_image: UploadedImage | null;
    demo_url: string | null;
    status: ThemeStatus;
}

export interface NewsroomThemePreset {
    theme: NewsroomTheme;
    editable_settings: JsonSchema;
    settings: Record<string, any>;
    is_active: boolean;
    email_branding: EmailBranding;
    preview_url: string | null;
}
