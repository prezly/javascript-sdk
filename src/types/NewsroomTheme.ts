import type { UploadedImage } from '@prezly/uploads';

import type { Newsroom } from './Newsroom';

export interface NewsroomTheme {
    id: string;
    codename: string;
    description: string;
    use_case: string | null;
    features: NewsroomTheme.Feature[];
    is_custom: boolean;
    is_legacy: boolean;
    name: string;
    preview_image: UploadedImage | null;
    demo_url: string | null;
    status: NewsroomTheme.Status;
}

export namespace NewsroomTheme {
    export enum Status {
        BETA = 'beta',
        STABLE = 'stable',
    }

    export enum Feature {
        CATEGORIES = 'categories',
        SEARCH = 'search',
        MEDIA_GALLERIES = 'media_galleries',
        BOILERPLATE = 'boilerplate',
        MULTI_LANGUAGE = 'multi_language',
        CUSTOM_COLORS = 'custom_colors',
        OPTIONAL_PRIVACY_PORTAL = 'optional_privacy_portal',
        CUSTOM_CSS_JAVASCRIPT = 'custom_css_javascript',
        HOMEPAGE_CONTACTS = 'homepage_contacts',
        SUBSCRIBE_FORM = 'subscribe_form',
        STORY_PINNING = 'story_pinning',
        TITLE_FORMATTING = 'title_formatting',
        CTA_BUTTONS = 'cta_buttons',
        VIDEO_LAYOUT = 'video_layout', // DEV-7588
        EMBED_LAYOUT = 'embed_layout', // DEV-11475
    }

    export function isFeatureSupported(theme: NewsroomTheme, feature: NewsroomTheme.Feature) {
        return theme.features.includes(feature);
    }
}

export interface NewsroomThemePreset {
    theme: NewsroomTheme;
    editable_settings: NewsroomThemePreset.JsonSchema;
    settings: Record<string, any>;
    is_active: boolean;
    email_branding: Newsroom.EmailBranding;
    preview_url: string | null;
}

export namespace NewsroomThemePreset {
    export interface JsonSchema {
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
}
