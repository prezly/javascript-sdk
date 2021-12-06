import { UploadedImage } from '@prezly/uploads';

import { ThemeFeature } from './ThemeFeature';
import { EmailBranding } from './EmailBranding';
import {ThemeStage} from "./ThemeStage";

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
    is_legacy: boolean;
    name: string;
    preview_image: UploadedImage | null;
    demo_url: string | null;
    stage: ThemeStage;
}

export interface NewsroomThemePreset {
    theme: NewsroomTheme;
    editable_settings: JsonSchema;
    settings: Record<string, any>;
    is_active: boolean;
    email_branding: EmailBranding;
}
