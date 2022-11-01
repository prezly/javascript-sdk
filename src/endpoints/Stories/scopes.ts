import type { Query } from '../../types';
import { Newsroom } from '../../types';

export const Scope: Record<string, Query> = {
    EXCLUDE_ARCHIVED_NEWSROOMS: {
        'newsroom.status': { $nin: [Newsroom.Status.ARCHIVED] },
    },
};
