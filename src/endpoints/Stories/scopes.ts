import { Newsroom } from '../../types';

import type { StoriesQuery } from './types';

export const Scope: Record<string, StoriesQuery> = {
    EXCLUDE_ARCHIVED_NEWSROOMS: {
        'newsroom.status': { $nin: [Newsroom.Status.ARCHIVED] },
    },
};
