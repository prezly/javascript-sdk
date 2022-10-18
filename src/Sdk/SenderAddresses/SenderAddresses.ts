import { SenderAddress } from '../../types';

import { DeferredJobsApiClient } from '../DeferredJobsApiClient';
import routing from '../routing';

import { SenderAddressCreateRequest, SenderAddressUpdateRequest } from './types';

export default class SenderAddresses {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async list(): Promise<SenderAddress[]> {
        const { senders } = await this.apiClient.get<{ senders: SenderAddress[] }>(
            routing.senderAddressesUrl,
        );
        return senders;
    }

    public async create(payload: SenderAddressCreateRequest): Promise<SenderAddress> {
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
        payload: SenderAddressUpdateRequest,
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
