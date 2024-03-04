import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { SenderAddress } from '../../types';
import { Query } from '../../types';

import type { CreateRequest, UpdateRequest } from './types';

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(scope?: Query): Promise<SenderAddress[]> {
        const { senders } = await api.get<{ senders: SenderAddress[] }>(
            routing.senderAddressesUrl,
            { query: { scope: Query.stringify(scope) } },
        );
        return senders;
    }

    async function create(payload: CreateRequest): Promise<SenderAddress> {
        const { sender } = await api.post<{ sender: SenderAddress }>(routing.senderAddressesUrl, {
            payload,
        });
        return sender;
    }

    async function get(senderId: SenderAddress['id']): Promise<SenderAddress> {
        const { sender } = await api.get<{ sender: SenderAddress }>(
            `${routing.senderAddressesUrl}/${senderId}`,
        );
        return sender;
    }

    async function update(
        senderId: SenderAddress['id'],
        payload: UpdateRequest,
    ): Promise<SenderAddress> {
        const { sender } = await api.patch<{ sender: SenderAddress }>(
            `${routing.senderAddressesUrl}/${senderId}`,
            { payload },
        );
        return sender;
    }

    async function doDelete(senderId: SenderAddress['id']): Promise<void> {
        return api.delete(`${routing.senderAddressesUrl}/${senderId}`);
    }

    return {
        list,
        create,
        get,
        update,
        delete: doDelete,
    };
}
