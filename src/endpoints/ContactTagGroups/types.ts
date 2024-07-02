import type { ContactTag } from '../../types';

export enum Color {
    RED = 'red',
    PINK = 'pink',
    ORANGE = 'orange',
    YELLOW = 'yellow',
    LIME = 'lime',
    GREEN = 'green',
    CYAN = 'cyan',
    BLUE = 'blue',
    INDIGO = 'indigo',
    PURPLE = 'purple',
}

export interface CreateRequest {
    name: string;
    color: Color;
    tags: ContactTag['id'][];
}

export interface UpdateRequest {
    name?: string;
    color?: Color;
}

export interface AddTagsRequest {
    tags: ContactTag['id'][];
}

export interface UngroupTagsRequest {
    tags: ContactTag['id'][];
}
