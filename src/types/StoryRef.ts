import Culture from './Culture';
import RoomRef from './RoomRef';
import StoryLifecycleStatus from './StoryLifecycleStatus';
import UserAccountRef from './UserAccountRef';

export default interface StoryRef {
    id: number;
    title: string;
    culture: Culture;
    created_at: string;
    author: UserAccountRef | null;
    room: RoomRef;
    lifecycle_status: StoryLifecycleStatus;
    links: {
        edit: string;
        newsroom_view: string;
        report: string;
    };
    visibility: 'embargo' | 'private' | 'public';
}
