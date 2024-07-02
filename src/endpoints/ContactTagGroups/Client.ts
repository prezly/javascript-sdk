import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { ContactTagGroup } from '../../types';

import type { CreateRequest, UpdateRequest, AddTagsRequest, UngroupTagsRequest } from './types';

type GroupId = ContactTagGroup['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(): Promise<ContactTagGroup[]> {
        const url = routing.contactTagGroupsUrl;
        const { groups } = await api.get<{ groups: ContactTagGroup[] }>(url);
        return groups;
    }

    async function get(groupId: GroupId): Promise<ContactTagGroup> {
        const url = routing.contactTagGroupsUrl;
        const { group } = await api.get<{ group: ContactTagGroup }>(`${url}/${groupId}`);
        return group;
    }

    async function create(payload: CreateRequest): Promise<ContactTagGroup> {
        const url = routing.contactTagGroupsUrl;
        const { group } = await api.post<{ group: ContactTagGroup }>(url, {
            payload,
        });
        return group;
    }

    async function update(groupId: GroupId, payload: UpdateRequest): Promise<ContactTagGroup> {
        const url = routing.contactTagGroupsUrl;
        const { group } = await api.patch<{ group: ContactTagGroup }>(`${url}/${groupId}`, {
            payload,
        });
        return group;
    }

    async function addTags(groupId: GroupId, payload: AddTagsRequest): Promise<ContactTagGroup> {
        const url = routing.contactTagGroupsUrl;
        const { group } = await api.post<{ group: ContactTagGroup }>(`${url}/${groupId}/tags`, {
            payload,
        });
        return group;
    }

    async function ungroupTags(payload: UngroupTagsRequest): Promise<void> {
        const url = routing.contactTagGroupsUrl;
        return api.delete(`${url}/tags`, {
            payload,
        });
    }

    async function doDelete(groupId: GroupId): Promise<void> {
        const url = routing.contactTagGroupsUrl;
        return api.delete(`${url}/${groupId}`);
    }

    return {
        list,
        get,
        create,
        update,
        addTags,
        ungroupTags,
        delete: doDelete,
    };
}
