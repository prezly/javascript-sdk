import { UploadcareImage } from './common';

export interface NewsroomTheme {
    id: string;
    name: string;
    description: string;
    features: string[];
    preview_image: UploadcareImage | null;
}

export default interface NewsroomThemePreset {
    theme: NewsroomTheme;
    editable_settings: Record<string, string>;
    settings: Record<string, any>;
    is_active: boolean;
}
