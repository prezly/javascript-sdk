import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { SenderAddress } from '../../types';
import { Query } from "../../types";

import type { CreateRequest, UpdateRequest } from './types';

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async list(scope?: Query): Promise<SenderAddress[]> {
        const { senders } = await this.apiClient.get<{ senders: SenderAddress[] }>(
            routing.senderAddressesUrl,
            { query: { scope: Query.stringify(scope) } }
        );
        return senders;
    }

    public async create(payload: CreateRequest): Promise<SenderAddress> {
        const { sender } = await this.apiClient.post<{ sender: SenderAddress }>(
            routing.senderAddressesUrl,
            { payload },
        );
        return sender;
    }

    public async get(senderId: SenderAddress['id']): Promise<SenderAddress> {
        const { sender } = await this.apiClient.get<{ sender: SenderAddress }>(
            `${routing.senderAddressesUrl}/${senderId}`,
        );
        return sender;
    }

    public async update(
        senderId: SenderAddress['id'],
        payload: UpdateRequest,
    ): Promise<SenderAddress> {
        const { sender } = await this.apiClient.patch<{ sender: SenderAddress }>(
            `${routing.senderAddressesUrl}/${senderId}`,
            { payload },
        );
        return sender;
    }

    public async remove(senderId: SenderAddress['id']): Promise<void> {
        return this.apiClient.delete(`${routing.senderAddressesUrl}/${senderId}`);
    }
}
