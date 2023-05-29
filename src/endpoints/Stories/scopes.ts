import { Newsroom } from '../../types';

import type { StoriesQuery } from './types';

export const Scope = {
    EXCLUDE_ARCHIVED_NEWSROOMS: {
        'newsroom.status': { $nin: [Newsroom.Status.ARCHIVED] },
    },
} satisfies Record<string, StoriesQuery>;
